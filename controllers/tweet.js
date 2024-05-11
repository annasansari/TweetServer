import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
// import User from "../models/user.js";

export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    } catch (err) {
        handleError(500, err);
    }
};
export const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("tweet has been deleted");
        } else {
            handleError(500, err);
        }
    } catch (err) {
        handleError(500, err);
    }
};


export const getUserTweets = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createAt: -1,
        });

        res.status(200).json(userTweets);
    } catch (err) {
        handleError(500, err);
    }
};