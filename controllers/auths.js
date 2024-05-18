const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { handleError } = require("../error.js");

// const JWT_SECRET = "E$%XCRT&b8yCrt7bY*";

exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT);

        const { password, ...othersData } = newUser._doc;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ message: "Account created successfully", data: othersData });
    } catch (err) {
        next(handleError(500, err));
    }
};

exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(handleError(404, "User not found"));

        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrectPassword) return next(handleError(400, "Wrong password"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);

        const { password, ...userData } = user._doc;

        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ data: userData });
    } catch (err) {
        next(handleError(500, err));
    }
};
