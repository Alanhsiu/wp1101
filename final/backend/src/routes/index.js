import express from "express";
import createResume from "./api/createResume";
import deleteDB from "./api/deleteDB";
import Teacher from "../models/teacher";

const router = express.Router();

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
  if (queryType == "name") query = await Teacher.find({ name: queryString });
  else query = await Teacher.find({ subject: queryString });
  var results = new Array();
  for (let i = 0; i < query.length; i++)
    results[i]= `Exist (${query[i].name}, ${query[i].subject}, ${query[i].price})`;

  if (query.length !== 0) res.send({ messages: results });
  else res.send({message:`${queryType} (${queryString}) not found!`});
});
router.delete("/clear-db", async (_, res) => {
  const msg = await deleteDB();
  res.send({ message: msg });
});

export default router; 