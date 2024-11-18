const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

//get all received request

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;

    //find all connection request that are pending
    const connectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender photoUrl skills");

    res.json({
      message: "requests fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error occured in fetching requests",
      error: error.message,
    });
  }
});

module.exports = userRouter;
