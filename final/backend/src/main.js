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
  await createResume("Alan", "EM", 99);
  await createResume("Alan", "ML", 98);
  await createResume("Bob", "Math", 90);
  await createResume("Bob", "WP", 66);
  await createResume("Candy", "English", 80);
  await createResume("Daniel", "EM", 87);
  await createResume("Ric", "WP", 0);
});
