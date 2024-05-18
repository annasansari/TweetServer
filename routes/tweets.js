const express = require("express");
const { verifyToken } = require("../verifyToken.js");
const { createTweet, deleteTweet, getUserTweets, updateTweet, getAllTweets } = require("../controllers/tweet.js");

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.put("/user/:id", updateTweet);
router.get("/user/all/:id", getUserTweets);
router.get("/allTweets", getAllTweets)

module.exports = router;
