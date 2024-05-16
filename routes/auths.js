const express = require("express");
const { signin, signup } = require("../controllers/auths.js");

const router = express.Router();

router.post("/signup", signup);
router.get("/signin", signin);

module.exports = router;
