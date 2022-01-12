import express from "express";
import createResume from "./api/createResume";
import deleteDB from "./api/deleteDB";
import ResumeModel from "../models/Resume";
import CaseModel from "../models/Case";
import uuid from "node-uuid";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv-defaults";
dotenv.config();
const MongoStore = require("connect-mongo");

import { needLogin } from "./api/middleware";
import { User } from "../models/User";

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
    console.log(existing);
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
    console.log(existing);
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
  const a = await ResumeModel.findOneAndUpdate({ 
    postId: req.body.postId },
    {      
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.trimmed_content,
      lowPrice: req.body.lowPrice,
      highPrice: req.body.highPrice,
    }
    )

  if (a.length === 0) {
    console.log("ok");
    //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
    const msg = await ResumeModel.create({
      postId: req.body.postId,
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.trimmed_content,
      lowPrice: req.body.lowPrice,
      highPrice: req.body.highPrice,
      timestamp: req.body.timestamp,
    });
    console.log("create");
    res.send(msg);
  } else {
    console.log("update");
    res.send("msg");
  }
});

router.post("/publish", async (req, res) => {
  console.log("ok");
  //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
  const msg = await CaseModel.create({
    postId: req.body.postId,
    name: req.body.name,
    subject: req.body.subject,
    description: req.body.trimmed_content,
    lowPrice: req.body.lowPrice,
    highPrice: req.body.highPrice,
    mail: req.body.mail,
    education: req.body.education,
    timestamp: req.body.timestamp,
  });
  console.log("case_done");
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
  if (queryType == "name")
    query = await ResumeModel.find({ name: queryString });
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

  let query;
  if(req.query.name.trim().length === 0 && req.query.subject.trim().length === 0 && req.query.price-0 === 0)
  query = await CaseModel.find({})

  else if(req.query.subject.trim().length === 0 && req.query.price-0 === 0)
  query = await CaseModel.find({ name: req.query.name})

  else if(req.query.name.trim().length === 0 && req.query.price-0 === 0)
  query = await CaseModel.find({ subject: req.query.subject})

  else if(req.query.subject.trim().length === 0 && req.query.name.trim().length === 0)
  query = await CaseModel.find({ price: req.query.price});

  else if(req.query.name.trim().length === 0)
  query = await CaseModel.find({ subject: req.query.subject, price: req.query.price});

  else if(req.query.price-0 === 0)
  query = await CaseModel.find({ subject: req.query.subject, name: req.query.name});

  else if(req.query.subject.trim().length === 0)
  query = await CaseModel.find({ name: req.query.name, price: req.query.price});

  else
  query = await CaseModel.find({ name: req.query.name, subject: req.query.subject, price: req.query.price});


  console.log(query);
   
  if (query !== []) res.send({ message: query });
  else {query = {name : "we cant find anything"}}
});

router.get('/resumeDetail',async (req, res) => {
  console.log(`my boiiii ${req.query.pid}`)
  const all = await ResumeModel.find({postId: req.query.pid});
  console.log(all)

  if(!all){
    res.status(403).send({message: "error", resume : null})
}
else{
  res.status(200).send({message: "success", resume: all})
}
  

})

router.get('/caseDetail',async (req, res) => {
  const filter =  req.query.pid;
  const all = await CaseModel.find({postId: filter});
  console.log(all)
  if(!all){
    res.status(403).send({message: "error", cases : null})
}
else{
  res.status(200).send({message: "success", cases: all})
}
  

})

router.delete("/clear-db", async (_, res) => {
  const msg = await deleteDB();
  res.send({ message: msg });
});

router.get("/session", needLogin, async (req, res, next) => {
  res.status(200).send({
    userID: req.session.userID,
  });
});

router.post(
  "/session",
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

router.delete("/session", async (req, res, next) => {
  req.session = null;
  res.status(204).end();
});

router.post("/user", async (req, res, next) => {
  const { userID, password, name } = req.body;
  if (!userID || !password || !name) {
    res.status(400).end();
  }

  const user = await User.findOne({ userID }).exec();
  if (user) {
    res.status(200).send("Existed User ID");
    return;
  }
  const newUser = new User({ userID, password, name });
  newUser.save();
  res.status(204).send("Registered");
  return;
});

export default router;
