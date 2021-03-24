import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./SignupForm.css";

const Profile = ({ updateUser }) => {
  const { currUser } = useContext(UserContext);
  const [formData, setFormData] = useState(currUser);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    delete formData.isAdmin;
    delete formData.applications;
    delete formData.username;
    let err = updateUser(currUser.username, formData);
    if (err) {
      alert(err);
    } else {
      history.push("/");
    }
  };
  return (
    <div className="ProfileEdit Form">
      <Form onSubmit={handleSubmit}>
        <h1>Edit your profile:</h1>

        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <button
          className="btn btn-lg btn-danger"
          onClick={(e) => {
            e.target.parentNode.reset();
            // console.log(e.target.parentNode);
          }}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-lg">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Profile;
