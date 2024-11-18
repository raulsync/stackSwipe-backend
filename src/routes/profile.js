const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");
const profileRouter = express.Router();

//Profile/view Router
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

//update Profile

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validate req.body
    if (!validateEditProfile(req)) {
      throw new Error("please only update the appropriate fields ");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (fields) => (loggedInUser[fields] = req.body[fields])
    );
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} , your profile is updated successfully`,
      data: [loggedInUser],
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//update Password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    // validateUpdatePassword(req);
    //get current password
    // const currentPassword = user.password;
    const { currentPassword, newPassword } = req.body;
    console.log(currentPassword, newPassword);

    if (!currentPassword || !newPassword) {
      throw new Error("All password fields are required");
    }
    if (currentPassword === newPassword) {
      throw new Error("your new password is same as current password");
    }
    //validate the password
    if (
      !validator.isStrongPassword(currentPassword) ||
      !validator.isStrongPassword(newPassword)
    ) {
      throw new Error("password must be strong");
    }

    //check password present in db
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("password is not valid");
    }

    const hashPassowrd = await bcrypt.hash(newPassword, 10);
    user.password = hashPassowrd;
    await user.save();
    res.send("password updated successfully");
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = profileRouter;
