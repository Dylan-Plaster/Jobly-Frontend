import React, { useContext } from "react";
import UserContext from "./UserContext";
const ErrPage = () => {
  const { errors } = useContext(UserContext);
  return <div>{errors ? errors : null}</div>;
};

export default ErrPage;
