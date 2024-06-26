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
  await saveScoreCard("Alan", "EM", 99);
  await saveScoreCard("Alan", "ML", 98);
  await saveScoreCard("Bob", "Math", 90);
  await saveScoreCard("Bob", "WP", 66);
  await saveScoreCard("Candy", "English", 80);
  await saveScoreCard("Daniel", "EM", 87);
  await saveScoreCard("Ric", "WP", 0);
});
///

router.get("/query-cards", async (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.queryString;
  // console.log(queryString);
  let query;
  if (queryType == "name") query = await ScoreCard.find({ name: queryString });
  else query = await ScoreCard.find({ subject: queryString });
  // console.log(query);
  // console.log(query.length);
  var results = new Array();
  for (let i = 0; i < query.length; i++) {
    results[i] =
      "Exist (" +
      query[i].name +
      "," +
      query[i].subject +
      "," +
      query[i].score +
      ")";
  }
  if (query.length !== 0) res.send({ messages: results });
  else res.send({ message: queryType + " (" + queryString + ") not found" });
});
router.delete("/clear-db", async (_, res) => {
  await deleteDB();
  res.send({ message: "Database cleared" });
});
router.post("/create-card", async (req, res) => {
  const name = req.body.name;
  const subject = req.body.subject;
  const score = req.body.score;
  const existing = await ScoreCard.findOne({ name, subject });
  // console.log("here:" + existing);
  ScoreCard.findOneAndDelete({ name, subject }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Scorecard:", docs);
    }
  });
  const action = existing ? "Updating" : "Adding";
  const msg = action + "(" + name + "," + subject + ", " + score + ")";
  saveScoreCard(name, subject, score);
  res.send({ message: msg, card: true });
});
export default router;