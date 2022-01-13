import express from "express";
import cors from "cors";
import router from "./routes/index";
import bodyParser from "body-parser";
// import dataInit from "./upload";
import { GraphQLServer, PubSub } from "graphql-yoga";
import * as db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Message from "./resolvers/Message";
import ChatBox from "./resolvers/ChatBox";
import connection from "./mongo";

const pubsub = new PubSub();
connection();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Message,
    ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});

