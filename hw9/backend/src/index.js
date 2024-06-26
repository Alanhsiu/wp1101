import { GraphQLServer, PubSub } from "graphql-yoga";
import * as db from "./db";
import mongo from "./mongo";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Message from "./resolvers/Message";
import ChatBox from "./resolvers/chatBox";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Message,
    ChatBox
  },
  context: {
    db,
    pubsub,
  },
});

mongo();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
