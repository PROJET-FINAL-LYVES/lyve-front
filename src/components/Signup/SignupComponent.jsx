import React from "react";
import { Link } from "react-router-dom";

const SignupComponent = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignupComponent;