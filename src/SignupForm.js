import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./SignupForm.css";

const SignupForm = ({ signup }) => {
  const history = useHistory();
  //   const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleSignup() {
      let err = await signup(formData);
      e.target.reset();
      if (err) {
        alert(err);

        // setErrors((e) => [...e, err]);
      } else {
        history.push("/");
      }
    }

    handleSignup();
    //   history.push("/");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <div className="Form">
      <Form onSubmit={handleSubmit}>
        <h1>Create an account:</h1>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" onChange={handleChange} />
        </FormGroup>
        <button type="submit" className="btn btn-lg">
          Submit
        </button>
        {/* <button onClick={() => console.log(errors)}>click</button> */}
      </Form>
    </div>
  );
};

export default SignupForm;
