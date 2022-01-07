import express from "express";
import createResume from "./api/createResume";
import deleteDB from "./api/deleteDB";
import Teacher from "../models/teacher";
import Parent from "../models/parent";

const router = express.Router();

router.get("/query-all", async (_, res) => {
  const existing = await Teacher.find().sort({});
  console.log(existing);

  try {
    const existing = await Teacher.find().sort({});
    if (existing) {
      res.status(200).send({
        message: "success",
        data: existing,
      });
    }
  } catch (e) {
    res.status(403).send({
      message: "error",
      data: null,
    });
  }
});

router.post("/create-card", async (req, res) => {
  const name = req.body.name;
  const subject = req.body.subject;
  const price = req.body.price;
  const msg = await createResume(name, subject, price);
  res.send(msg);
});

router.get("/query-cards", async (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.queryString;
  let query;
  if (queryType == "name") {query = await Teacher.find({ name: queryString });
  console.log("ok")
  console.log(query)}
  else {query = await Teacher.find({ subject: queryString });
  console.log("ok")
  console.log(query)}
  if (query.length !== 0) res.send({ message: query });
  else res.send({message:`${queryType} (${queryString}) not found!`});
});
router.delete("/clear-db", async (_, res) => {
  const msg = await deleteDB();
  res.send({ message: msg });
});



export default router; 