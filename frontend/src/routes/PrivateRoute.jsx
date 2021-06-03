import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../auth/useAuth";

const PrivateRoute = (props) => {
  const { user } = useAuth();

  if (!user) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default PrivateRoute;
