const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { handleError } = require("../error.js");

exports.signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).json({ message: "Account created successfully" });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT);

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

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(handleError(400, "Wrong password"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...othersData } = user._doc;

        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(othersData);
    } catch (err) {
        next(err);
    }
};
