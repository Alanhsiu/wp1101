import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../api";

export default function PrivateRoute({ element, path }) {
  let isAuth = true;
  instance.get("/api/session").then(async (response) => {
    const status = await response.status;
    if (status === 200) {
      isAuth = true;
    } else {
      isAuth = false;
    }
  });
  if (isAuth) return <Outlet />;
  else return <Navigate to="/login" />;
}
