import express from "express";
import { getNumber, genNumber } from "../core/getNumber";
const router = express.Router();
router.post("/start", (_, res) => {
  genNumber(); // 用亂數產生一個猜數字的 number
  res.json({ msg: "The game has started." });
});
function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed;
}
router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = roughScale(req.query.number, 10);
  console.log("num is "+number);
  console.log(guessed);
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: "Not a legal number." });
  } else if (number === guessed) {
    res.send({ msg: "Equal" });
  } else if (number > guessed) {
    res.send({ msg: "Bigger" });
  } else {
    res.send({ msg: "Smaller" });
  }
});
router.post("/restart", (_, res) => {
  genNumber();
  res.json({ msg: 'The game has restarted.' })
});
export default router;
