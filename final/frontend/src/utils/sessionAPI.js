import instance from "../api";
import qs from "qs";

const sessionAPI = {
  getSession: () => instance.get("/api/session"),
  postSession: (payload) => instance.post("/api/session", payload),
  deleteSession: () => instance.delete("/api/session"),
};

export default sessionAPI;
