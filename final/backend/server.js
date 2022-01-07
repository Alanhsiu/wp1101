import express from "express";
import cors from "cors";
import index from "./src/routes/index";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
// init middleware
app.use(cors());
// define routes
app.use('/api/index', index);
// app.use('/api/clear-db', scoreCardRoute);

// define server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
