import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import ErrPage from "./ErrPage";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useLocalStorage("username", "", setLoading);
  const [currUser, setCurrUser] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useLocalStorage("token", "", setLoading);
  const [errors, setErrors] = useState([]);

  // Use Effect to update companies, also handles keyword search through companies
  useEffect(() => {
    async function getComps() {
      if (keyword !== "") {
        let res = await JoblyApi.filterCompanies(keyword);
        setCompanies(res);
      } else {
        let res = await JoblyApi.getAllCompanies();
        setCompanies(res);
      }
    }

    async function getJobs() {
      let res = await JoblyApi.getAllJobs();
      setJobs(res);
    }
    // setCompanies((c) => getComps());
    getComps();
    getJobs();
  }, [keyword]);

  useEffect(() => {});

  // UseEffect to get new user info and store it in currUser:
  useEffect(() => {
    async function getUser() {
      if (!username) {
        return null;
      }
      let res = await JoblyApi.userInfo(username, token);
      setCurrUser(res);
      setLoading(false);
      setErrors(null);
      window.localStorage.setItem("isAuth", true);
    }
    getUser();
  }, [token, username]);

  const signup = async (data) => {
    try {
      let res = await JoblyApi.signup(data);
      setUsername(data.username);
      setToken(res);
    } catch (e) {
      return e;
    }
  };

  const login = async (data) => {
    try {
      let res = await JoblyApi.login(data);
      setUsername(data.username);
      setToken(res);
      setErrors(null);
      //   window.localStorage.setItem("isAuth", true);
    } catch (e) {
      return e;
    }
  };

  const updateUser = (username, data) => {
    try {
      JoblyApi.updateUser(username, data, token);
    } catch (e) {
      return e;
    }
  };

  const apply = async (username, jobId) => {
    try {
      await JoblyApi.apply(username, jobId, token);
      setCurrUser((user) => ({
        ...user,
        applications: [...user.applications, jobId],
      }));
    } catch (e) {
      return e;
    }
  };

  const logout = (data) => {
    setUsername(null);
    setToken(null);
    setCurrUser(null);
    // setApplied([]);
    window.localStorage.clear();
    JoblyApi.logout();
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currUser,
          setCurrUser,
          logout,
          errors,
          setErrors,
          apply,
          loading,
        }}
      >
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <PrivateRoute
            exact
            path="/companies"
            user={currUser}
            companies={companies}
            keyword={keyword}
            setKeyword={setKeyword}
            component={CompanyList}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/companies/:handle"
            user={currUser}
            component={CompanyDetail}
          >
            {/* <CompanyDetail /> */}
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/jobs"
            user={currUser}
            jobs={jobs}
            component={JobList}
          >
            {/* <JobList jobs={jobs} /> */}
          </PrivateRoute>
          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          <PrivateRoute
            exact
            path="/profile"
            user={currUser}
            updateUser={updateUser}
            component={Profile}
          >
            {/* <Profile updateUser={updateUser} /> */}
          </PrivateRoute>
          <Route>
            <ErrPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
