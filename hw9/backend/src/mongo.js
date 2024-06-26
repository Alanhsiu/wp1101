import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

export default () => {
  dotenv.config();
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!");
    process.exit(1);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (err) => {
    throw new Error("DB connection error: " + err);
  });
  db.once("open", () => {
    console.log("MongoDB connected!");
  });
};
