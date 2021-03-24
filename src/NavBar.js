import React, { useContext } from "react";
import UserContext from "./UserContext";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import "./NavBar.css";

const NavBar = () => {
  const { currUser, logout } = useContext(UserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
        </Nav>
        <Nav className="" navbar>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
        </Nav>
        {currUser ? (
          <>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="#" onClick={() => logout()}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/signup">Sign up</NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
            </Nav>{" "}
          </>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;
