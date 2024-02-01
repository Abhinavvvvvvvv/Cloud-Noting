const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Abhinavisagood$oi";

// ROUTE 1: Create a User using: POST "api/auth/createuser". No login requrired
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad  request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether this email exists already

    try {
      let user = await User.findOne({ email: req.body.email });

      //Password Hashing
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);

      user
        ? res.status(400).json({ error: "An Email already exists" })
        : (user = await User.create({
            //CREATING USER HERE
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
          }));

      const data = {
        user: {
          id: user.id,
        },
      };
      const authTokken = jwt.sign(data, JWT_SECRET);

      // res.json({ user });
      res.json({ authTokken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad  request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try again" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please try again" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authTokken = jwt.sign(payload, JWT_SECRET);
      res.json({ authTokken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Get logged in User deatils using: POST "/api/auth/getuser". Login required
router.post(
  "/getuser", // 1st Parameter which is Endpoint
  fetchuser, // 2nd Parameter which is Middleware
  async (req, res) => {
    //3rd Parameter which is function with req and res
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
