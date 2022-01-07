import express from "express";
import cors from "cors";
import router from "./routes/index";
import bodyParser from "body-parser";
import db from "./mongo";
import createResume from "./routes/api/createResume";
import deleteDB from "./routes/api/deleteDB";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  await deleteDB();
  await createResume("Alan", "Chinese", 100);
  await createResume("Bob", "Math", 90);
  await createResume("Candy", "English", 80);
  await createResume("Alan1", "Chinese", 100);
  await createResume("Bob1", "Math", 90);
  await createResume("Candy1", "English", 80);
  // await createResume("Alan2", "Chinese", 100);
  // await createResume("Bob2", "Math", 90);
  // await createResume("Candy2", "English", 80);
});
