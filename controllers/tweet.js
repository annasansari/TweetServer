const Tweet = require("../models/Tweet.js");
const { handleError } = require("../error.js");
const User = require("../models/user.js");

exports.createTweet = async (req, res, next) => {

    const { userId, description } = req.body
    // console.log(userId, description)
    try {
        const user = await User.findById(userId)
        // console.log(user)
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        const tweet = new Tweet({
            userId: user._id,
            description: description,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.profilePicture
        })

        await tweet.save()

        res.status(201).json({ message: "Tweet created successfully", data: tweet })

    } catch (error) {
        next(handleError(500, error))
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

exports.getAllTweets = async (req, res, next) => {

    try {
        const tweets = await Tweet.find()

        if (tweets.length == 0 || !tweets) {
            res.status(403).json({ message: "Tweets not found" })
        }
        res.status(200).json({ data: tweets })

    } catch (error) {
        next(handleError(500, error))
    }
}