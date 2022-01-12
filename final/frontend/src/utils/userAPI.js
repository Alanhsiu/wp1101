import instance from "../api";

const userAPI = {
  getUser: (userID) => {
    return instance.get("/api/user:userID");
  },
  postUser: async ({ userID, password, userName }) => {
    await instance.post("/api/user", { userID, password, userName });
    return;
  },
};

export default userAPI;
