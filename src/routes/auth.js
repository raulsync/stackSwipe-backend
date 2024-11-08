const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validate");
const User = require("../models/user");
const authRouter = express.Router();
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password

    //  bcrypt takes second arguement as saltrounds like how much tight secure our password

    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new instance of user model
    //we never pass the req.body to the database we first destructure it and save it to db
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//Login Auth

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check if email is valid or not
    if (!validator.isEmail(emailId)) {
      throw new Error("please enter valid email");
    }
    const user = await User.findOne({
      emailId,
    });
    if (!user) {
      throw new Error("invalid password");
    }
    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      //get jwt token
      const token = await user.getJwt();
      // add token to cookie and send back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//logout

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully");
});

module.exports = authRouter;
