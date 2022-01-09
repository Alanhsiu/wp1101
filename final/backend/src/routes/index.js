import express from "express";
import createResume from "./api/createResume";
import deleteDB from "./api/deleteDB";
import Teacher from "../models/teacher";
import ResumeModel from "../models/Resume";
import CaseModel from "../models/Case"
import Parent from "../models/Resume";
import uuid from "node-uuid";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv-defaults";
dotenv.config();
const MongoStore = require("connect-mongo");

import { User } from "../models/User";
//import { loginRequired } from "./api/middleware";

const router = express.Router();
const secret = uuid.v4();
const sessionOptions = {
  cookie: {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: null,
  },
  resave: false,
  saveUninitialized: false,
  secret,
  unset: "destroy",
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
};

sessionOptions.store.clear();

router.get("/query_all_resume", async (_, res) => {
  try {
    const existing = await ResumeModel.find({}).sort({ timestamp: -1 });
    console.log(existing)
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

router.get("/query_all_cases", async (_, res) => {
  try {
    const existing = await CaseModel.find({}).sort({ timestamp: -1 });
    console.log(existing)
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

router.post("/resume", async (req, res) => {
  const a = await ResumeModel.find({postId : req.body.postId}).sort({ timestamp: -1 });
  console.log(a)
  if(a.length === 0){
    console.log("ok")
    //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
    const msg = await ResumeModel.create({
      postId : req.body.postId, 
      name : req.body.name, 
      subject : req.body.subject, 
      content : req.body.trimmed_content, 
      price : req.body.price,
      timestamp : req.body.timestamp
      });
    console.log("done")
    res.send(msg);
  }
  else{
    res.send("msg");
  }
});

router.post("/publish", async (req, res) => {
    console.log("ok")
    //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
    const msg = await CaseModel.create({
      postId : req.body.postId, 
      name : req.body.name, 
      subject : req.body.subject, 
      description : req.body.trimmed_content, 
      price : req.body.price,
      timestamp : req.body.timestamp
      });
    console.log("case_done")
    res.send(msg);
});

router.get("/query_resume", async (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.queryString;
  let query;
  if (queryType == "name") {
    query = await ResumeModel.find({ name: queryString });
    console.log("ok");
    console.log(query);
  } else {
    query = await ResumeModel.find({ subject: queryString });
    console.log("ok");
    console.log(query);
  }
  if (query.length !== 0) res.send({ message: query });
  else res.send({ message: `${queryType} (${queryString}) not found!` });
  if (queryType == "name") query = await ResumeModel.find({ name: queryString });
  else query = await ResumeModel.find({ subject: queryString });
  var results = new Array();
  for (let i = 0; i < query.length; i++)
    results[
      i
    ] = `Exist (${query[i].name}, ${query[i].subject}, ${query[i].price})`;

  if (query.length !== 0) res.send({ messages: results });
  else res.send({ message: `${queryType} (${queryString}) not found!` });
});

router.get("/query_case", async (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.queryString;
  let query;
  if (queryType == "name") {
    query = await CaseModel.find({ name: queryString });
    console.log("ok");
    console.log(query);
  } else {
    query = await CaseModel.find({ subject: queryString });
    console.log("ok");
    console.log(query);
  }
  if (query.length !== 0) res.send({ message: query });
  else res.send({ message: `${queryType} (${queryString}) not found!` });
  if (queryType == "name") query = await CaseModel.find({ name: queryString });
  else query = await CaseModel.find({ subject: queryString });
  var results = new Array();
  for (let i = 0; i < query.length; i++)
    results[
      i
    ] = `Exist (${query[i].name}, ${query[i].subject}, ${query[i].price})`;

  if (query.length !== 0) res.send({ messages: results });
  else res.send({ message: `${queryType} (${queryString}) not found!` });
});


router.delete("/clear-db", async (_, res) => {
  const msg = await deleteDB();
  res.send({ message: msg });
});

router.get("/session", async (req, res, next) => {
  res.status(200).send({
    userID: req.session.userID,
  });
});

router.post(
  "session",
  express.urlencoded({ extended: false }),
  async (req, res, next) => {
    const { userID, password } = req.body;
    if (!userID || !password) {
      res.status(400).end();
      return;
    }
    const user = await User.findOne({ userID }).exec();
    if (!user) {
      res.status(400).end();
      return;
    }
    const hashedPwd = user.password;
    const { name } = user;

    const match = await bcrypt.compare(password, hashedPwd);
    if (!match) {
      res.status(401).end();
      return;
    }

    req.session.userID;
    req.session.name = name;
    res.status(200).send({ userID });
  }
);

router.delete("session", async (req, res, next) => {
  req.session = null;
  res.status(204).end();
});

export default router;
