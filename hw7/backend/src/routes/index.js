import express from "express";
import mongoose from "mongoose";
import ScoreCard from "../models/ScoreCard";
import dotenv from "dotenv-defaults";
const router = express.Router();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));

/// operations
const saveScoreCard = async (name, subject, score) => {
  try {
    const newScoreCard = new ScoreCard({ name, subject, score });
    console.log("Created ScoreCard", newScoreCard);
    return newScoreCard.save();
  } catch (e) {
    throw new Error("ScoreCard creation error: " + e);
  }
};
const updateScoreCard = async (name, subject, score) => {
  try {
    const newScoreCard = new ScoreCard({ name, subject, score });
    console.log("Created ScoreCard", newScoreCard);
    return newScoreCard.save();
  } catch (e) {
    throw new Error("ScoreCard creation error: " + e);
  }
};
const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  await deleteDB();
  await saveScoreCard("Alan", "Chinese", 100);
  await saveScoreCard("Betty", "Math", 90);
  await saveScoreCard("Chen", "English", 80);
});
///

router.post("/clear-db", (_, res) => {
  deleteDB();
  res.send({ message: "Clear all" });
});
router.post("/create-card", async (req, res) => {
  const name = req.body.name;
  const subject = req.body.subject;
  const score = req.body.score;
  const existing = await ScoreCard.findOne({ name, subject });
  console.log(existing);
  const action = existing ? "Updating" : "Adding";
  const msg = action + "(" + name + "," + subject + ", " + score + ")";
  if (existing) {
    ScoreCard.findOneAndUpdate(id, {score}){
      if(err) console.log(err);
      console.log('更改成功：');
  })
  } else saveScoreCard(name, subject, score);
  res.send({ message: msg, card: true });
});
export default router;
