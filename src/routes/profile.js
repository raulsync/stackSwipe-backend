const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();

//Profile Router
profileRouter.get("/profile", userAuth, (req, res) => {
  try {
    // console.log(req);
    //get user from req.user that logic written in userAuth middleware

    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
