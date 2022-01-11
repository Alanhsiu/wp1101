import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, path }) {
  let isAuth = false;
  instance
    .get("/session")
    .then(async (response) => {
      const status = await response.status;
      if (status === 200) {
        isAuth = true;
      } else {
        isAuth = false;
      }
    })
    .catch(async (error) => console.log(error));
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
