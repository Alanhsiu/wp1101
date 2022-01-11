import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, isAuth, path }) {
  return (
    <Route
      path={path}
      render={() => {
        if (!isAuth) return <Redirect to="/login" />;
        return children;
      }}
    />
  );
}
