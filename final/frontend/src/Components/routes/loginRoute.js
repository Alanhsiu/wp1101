import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function LoginRoute({ children, isAuth, path }) {
  return (
    <Route
      path={path}
      render={() => {
        return isAuth ? <Redirect to="/profile" /> : children;
      }}
    />
  );
}
