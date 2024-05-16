const Tweet = require("../models/Tweet.js");
const { handleError } = require("../error.js");
// const User = require("../models/user.js");

exports.createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        const savedTweet = await newTweet.save();
        res.status(200).json({ message: "Tweet created", data: savedTweet });
    } catch (err) {
        next(handleError(500, err));
    }
};

exports.deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("tweet has been deleted");
        }
    } catch (err) {
        next(handleError(500, err));
    }
};

exports.updateTweet = async (req, res, next) => {
    try {
        const updatedTweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.status(200).json({ message: "Tweet Update successfully", data: updatedTweet });
    } catch (err) {
        next(handleError(500, err));
    }
};


exports.getUserTweets = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createAt: -1,
        });

        res.status(200).json(userTweets);
    } catch (err) {
        next(handleError(500, err));
    }
};
