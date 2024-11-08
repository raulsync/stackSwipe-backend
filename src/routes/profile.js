const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");
const profileRouter = express.Router();

//Profile Router
profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    // console.log(req);
    //get user from req.user that logic written in userAuth middleware

    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validate req.body
    if (!validateEditProfile(req)) {
      throw new Error("please only update the appropriate fields ");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach(
      (fields) => (loggedInUser[fields] = req.body[fields])
    );
    await loggedInUser.save();
    console.log(loggedInUser);
    res.json({
      message: `${loggedInUser.firstName} , your profile is updated successfully`,
      data: [loggedInUser],
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
