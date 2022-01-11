import instance from "../api";

const userAPI = {
  getUser: (userID) => {
    return instance.get("/api/user:userID");
  },
  postUser: async (userID, password, name) => {
    await instance.post("/api/user", { userID, password, name });
    return;
  },
};

export default userAPI;
