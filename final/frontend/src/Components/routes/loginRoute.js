import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../api";

export default function LoginRoute({ element, path }) {
  let isAuth = false;
  instance
    .get("/api/session")
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        isAuth = true;
      } else {
        isAuth = false;
      }
    })
    .catch(async (error) => console.log(error));
  return isAuth ? <Navigate to="/profile" /> : <Outlet />;
}
