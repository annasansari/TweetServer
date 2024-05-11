import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createTweet, deleteTweet, getUserTweets, } from "../controllers/tweet.js";

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.get("/user/all/:id", getUserTweets);

export default router 
