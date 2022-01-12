import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../api";

export default function PrivateRoute({ element, path }) {
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
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
