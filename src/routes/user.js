const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_DATA = ["firstName", "lastName"];

//get all received request
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;

    //find all connection request that are pending
    const connectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    //populate("fromUserId",["firstName","lastName"]) another way to do this

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //find all connections that has accepted status
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: user._id,
        },
        { toUserId: user._id },
      ],
      status: "accepted",
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    //check whether fromuserid is same person that logged in if then return touserid else fromuserid
    const connectionRequestsData = connectionRequests.map(
      (connectionRequest) => {
        if (
          connectionRequest.fromUserId._id.toString() === user._id.toString()
        ) {
          return connectionRequest.toUserId;
        } else {
          return connectionRequest.fromUserId;
        }
      }
    );
    res.json({
      data: connectionRequestsData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured while fetching connections",
      error: error.message,
    });
  }
});

module.exports = userRouter;
