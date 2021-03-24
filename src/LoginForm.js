import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./SignupForm.css";

const LoginForm = ({ login }) => {
  const { errors, currUser } = useContext(UserContext);
  const history = useHistory();

  const [formData, setFormData] = useState({ username: "", password: "" });
  if (currUser) {
    return <Redirect to="/"></Redirect>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleLogin() {
      let err = await login(formData);
      e.target.reset();
      if (err) {
        alert(err);
      } else {
        history.push("/");
      }
    }
    handleLogin();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <div className="Form">
      {errors ? <div className="LoginForm-error">{errors}</div> : null}
      <Form onSubmit={handleSubmit}>
        <h1>Login:</h1>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" onChange={handleChange} />
        </FormGroup>
        <button type="submit" className="btn btn-lg">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
