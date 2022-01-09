import express from "express";
import cors from "cors";
import router from "./routes/index";
import bodyParser from "body-parser";
import db from "./mongo";
import dataInit from "./upload"

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
db.on("error", (err) => console.log(err));
db.once("open", async () =>  {
  //await dataInit();
});
 