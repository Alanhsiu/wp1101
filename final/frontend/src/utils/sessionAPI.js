import instance from "../api";
import qs from "qs";

const sessionAPI = {
  getSession: () => instance.get("/api/session"),
  postSession: (userID, password) =>
    instance.post(
      "/api/session",
      qs.stringify({
        userID,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ),
  deleteSession: () => instance.delete("/api/session"),
};

export default sessionAPI;
