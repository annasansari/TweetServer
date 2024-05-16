const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { handleError } = require("../error.js");

const JWT_SECRET = "E$%XCRT&b8yCrt7bY*";

exports.signup = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

        const { password, ...othersData } = newUser._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(othersData);
    } catch (err) {
        next(err);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(handleError(404, "User not found"));

        if (req.body.password !== user.password) {
            return next(handleError(400, "Wrong password"));
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        const { password, ...othersData } = user._doc;

        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(othersData);
    } catch (err) {
        next(err);
    }
};
