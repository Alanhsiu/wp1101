import mongoose from "mongoose";

const needLogin = async (req, res, next) => {
  if (!req.session.userID) {
    res.status(403).end();
    return;
  }
  next();
};

export { needLogin };
