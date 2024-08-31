import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  return <LoginCard  />;
};

export default Login;
