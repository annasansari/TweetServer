const express = require("express");
const { verifyToken } = require("../verifyToken.js");
const { createTweet, deleteTweet, getUserTweets, updateTweet } = require("../controllers/tweet.js");

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.put("/user/:id", updateTweet);
router.get("/user/all/:id", getUserTweets);

module.exports = router;
