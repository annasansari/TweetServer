const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            max: 280,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetSchema);
