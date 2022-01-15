import express from "express";
import createResume from "./api/createResume";
import deleteDB from "./api/deleteDB";
import ResumeModel from "../models/Resume";
import CaseModel from "../models/Case";
import uuid from "node-uuid";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv-defaults";
import { UserModel, TokenModel } from "../db";
dotenv.config();
const MongoStore = require("connect-mongo");
import nodemailer from "nodemailer";

import { needLogin } from "./api/middleware";
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
const SALT_ROUNDS = 12;
router.use(session(sessionOptions));

const SMTPTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILACCOUNT,
    pass: process.env.EMAILPASSWORD,
  },
});

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
  console.log("resume");
  const a = await ResumeModel.findOneAndUpdate(
    {
      userId: req.body.id,
    },
    {
      subject1: req.body.subject1,
      subject2: req.body.subject2,
      subject3: req.body.subject3,
      description: req.body.trimmed_content,
      education: req.body.education,
      mail: req.body.mail,
      lowPrice: req.body.lowPrice,
      highPrice: req.body.highPrice,
    }
  );
  console.log(a);
  if (a === null) {
    console.log("ok");
    //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
    try {
      const msg = await ResumeModel.create({
        postId: req.body.postId,
        userId: req.body.id,
        userName: req.body.me,
        subject1: req.body.subject1,
        subject2: req.body.subject2,
        subject3: req.body.subject3,
        description: req.body.trimmed_content,
        education: req.body.education,
        mail: req.body.mail,
        lowPrice: req.body.lowPrice,
        highPrice: req.body.highPrice,
        timestamp: req.body.timestamp,
      });
      console.log("create");
      res.status(200).send({
        message: "success",
        data: msg,
      });
    } catch (e) {
      console.log(e);
      res.status(403).send({
        message: "error",
        data: null,
      });
    }
  } else {
    console.log("update");
    res.send(a);
  }
});

router.post("/publish", async (req, res) => {
  console.log(req.body.id);
  const highPrice = parseInt(req.body.highPrice, 10);
  const lowPrice = parseInt(req.body.lowPrice, 10);
  console.log(typeof req.body.trimmed_content);
  //const msg = await createResume(req.body.postId, req.body.name, req.body.subject,req.body.content,req.body.price);
  try {
    const msg = await CaseModel.create({
      postId: req.body.postId,
      userId: req.body.id,
      userName: req.body.me,
      subject: req.body.subject,
      area: req.body.area,
      description: req.body.trimmed_content,
      lowPrice: lowPrice,
      highPrice: highPrice,
      //timestamp: req.body.timestamp,
    });
    console.log("case_done");
    res.status(200).send({
      message: "success",
      data: msg,
    });
  } catch (e) {
    console.log(e);
    res.status(403).send({
      message: "error",
      data: e,
    });
  }
});

router.get("/query_resume", async (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.id;
  console.log(queryType)
  console.log(queryString)
  let query;

  if (queryType == "userId") {
    let result = [];
    const a = await ResumeModel.find({ userId: queryString });
    if (a[0] === undefined){
      result = ["","","","","","",""]
    }
    else {   
      result = [a[0].subject1, a[0].subject2, a[0].subject3, a[0].lowPrice, a[0].highPrice, a[0].education,a[0].description, ]
    }
    res.send({result: {result}})
  }
  else{
  if (queryType == "name") {
    query = await ResumeModel.find({ userName: queryString });
    console.log("ok");
    console.log(query);
  }
  else {
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
  }
});

router.get("/query_case", async (req, res) => {
  let query;
  if (req.query.subject.trim().length === 0 && req.query.price - 0 === 0)
    query = await CaseModel.find({});
  else if (req.query.price - 0 === 0)
    query = await CaseModel.find({
      subject: req.query.subject,
    });
  else if (req.query.subject.trim().length === 0)
    query = await CaseModel.find({
      price: req.query.price,
    });
  else
    query = await CaseModel.find({
      subject: req.query.subject,
      price: req.query.price,
    });

  console.log(query);

  if (query !== []) res.send({ message: query });
  else {
    query = { name: "we cant find anything" };
  }
});

router.get("/resumeDetail", async (req, res) => {
  console.log(`my boiiii ${req.query.pid}`);
  const all = await ResumeModel.find({ postId: req.query.pid });
  console.log(all);

  if (!all) {
    res.status(403).send({ message: "error", resume: null });
  } else {
    res.status(200).send({ message: "success", resume: all });
  }
});

router.get("/caseDetail", async (req, res) => {
  const filter = req.query.pid;
  const all = await CaseModel.find({ postId: filter });
  console.log(all);
  if (!all) {
    res.status(403).send({ message: "error", cases: null });
  } else {
    res.status(200).send({ message: "success", cases: all });
  }
});

router.delete("/clear-db", async (_, res) => {
  const msg = await deleteDB();
  res.send({ message: msg });
});

router.get("/session", needLogin, async (req, res, next) => {
  res
    .status(200)
    .send({ userID: req.session.userID, isVerified: req.session.isVerified });
  return;
});

router.post("/session", async (req, res, next) => {
  const { userID, password } = req.body;
  console.log(userID);
  console.log(password);
  if (!password) {
    console.log(userID);
    res.status(400).end();
    return;
  }
  const user = await UserModel.findOne({ userID }).exec();
  if (!user) {

    res.status(400).end();
    return;
  }
  const hashedPwd = user.password;
  const { userName, isVerified } = user;

  const match = await bcrypt.compare(password, hashedPwd);
  if (!match) {
    res.status(401).end();
    return;
  }

  req.session.userID = userID;
  req.session.name = userName;
  req.session.isVerified = isVerified;
  console.log(req.session);
  res.status(200).send({ userID, userName, isVerified });
});

router.delete("/session", async (req, res, next) => {
  req.session = null;
  res.status(204).end();
});

router.post("/user", async (req, res, next) => {
  const { userID, password } = req.body;
  if (!userID || !password ) {
    res.status(400).end();
    return;
  }

  const user = await UserModel.findOne({ userID }).exec();
  if (user) {
    res.status(403).send("Existed User ID");
    
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const newpasswordHash = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    userID,
    password: newpasswordHash,
    userName,
  });
  newUser.save();
  res.status(204).send("Registered");
  return;
});

router.post("/verify", async (req, res, next) => {
  const { userID } = req.body;
  const user = UserModel.find({ userID });
  let token = new TokenModel({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  let mailOptions = {
    from: process.env.EMAILACCOUNT,
    to: user.email,
    subject: "Account Verification Link",
    text:
      "Hello " +
      req.body.name +
      ",\n\n" +
      "Please verify your account by clicking the link: \nhttp://" +
      req.headers.host +
      "/confirmation/" +
      user.email +
      "/" +
      token.token +
      "\n\nThank You!\n",
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      return res.status(500).send({
        msg: "Technical Issue!, Please click on resend for verify your Email.",
      });
    }
    return res
      .status(200)
      .send(
        "A verification email has been sent to " +
          user.email +
          ". It will be expire after one day. If you not get verification Email click on resend token."
      );
  });
});

export default router;
