import http from "http";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import WebSocket from "ws";
import Message from "../models/message";
import { sendData, sendStatus, initData } from "./wssConnect";

dotenv.config();

const broadcastMessage = (data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws) => {
    initData(ws);
    ws.onmessage = async (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data);
      switch (task) {
        case "input": {
          const { name, body } = payload;
          const message = new Message({ name, body });
          try {
            await message.save();
          } catch (e) {
            throw new Error("Message DB save error: " + e);
          }
          broadcastMessage(["output", [payload]], {
            type: "success",
            msg: "Message sent.",
          });
          // sendData(["output", [payload]], ws);
          // sendStatus(
          //   {
          //     type: "success",
          //     msg: "Message sent.",
          //   },
          //   ws
          // );
          break;
        }
        case "clear": {
          Message.deleteMany({}, () => {
            broadcastMessage(["cleared"],{ type: "info", msg: "Message cache cleared." })
            // sendData(["cleared"], ws);
            // sendStatus({ type: "info", msg: "Message cache cleared." }, ws);
          });
          break;
        }
        default:
          break;
      }
    };
  });

  const PORT = process.env.port || 4000;
  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
