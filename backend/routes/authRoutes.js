const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.json({
    message: "User Registered",
  });
});


// LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  const validPassword =
    await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: user._id },
    "secretkey"
  );

  res.json({
    token,
    username: user.username,
  });
});

module.exports = router;