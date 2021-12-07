import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

const savePost = async (postId, title, content, timestamp) => {
  try {
    const newPost = new Post({ postId, title, content, timestamp });
    console.log("Created ScoreCard", newPost);
    return newPost.save();
  } catch (e) {
    throw new Error("ScoreCard creation error: " + e);
  }
};
// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async (_, res) => {
  const existing = await Post.find().sort({ timestamp: -1 });
  console.log(existing);

  try {
    const existing = await Post.find().sort({ timestamp: -1 });
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

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", async (req, res) => {
  const pid = req.query.pid;
  try {
    const existing = await Post.find({ postId: pid });
    if (existing) {
      res.status(200).send({
        message: "success",
        post: existing,
      });
    }
  } catch (e) {
    res.status(403).send({
      message: "error",
      post: null,
    });
  }
});

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/newPost", async (req, res) => {
  const postId = req.body.postId;
  const title = req.body.title1;
  const content = req.body.content1;
  const timestamp = req.body.timestamp;
  try {
    await savePost(postId, title, content, timestamp);
    res.status(200).send({
      message: "success",
    });
  } catch (e) {
    res.status(403).send({ message: "error", post: null });
  }
});
// TODO 5-(1): create the 4th API (/api/post)
router.delete("/post", async (req, res) => {
  const postId = req.body.postId;
  try {
    Post.remove({ postId });
    res.status(200).send({ message: "success" });
  } catch (e) {
    res.status(403).send({
      message: "error",
      post: null,
    });
  }
});

export default router;
