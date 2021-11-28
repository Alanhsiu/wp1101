import express from "express";
import cors from "cors";
import scoreCardRoute from "./routes/index";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
// init middleware
app.use(cors());
// define routes
app.use('/api/scoreCard', scoreCardRoute);
// app.use('/api/clear-db', scoreCardRoute);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});