const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

//send connection request api

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //validate Allowed status
      const allowedStatus = ["interested", "ignored", "accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "please enter valid status" });
      }

      const fromUser = await User.findById(fromUserId);
      const toUser = await User.findById(toUserId);

      //check if toUser exist or not
      if (!toUser) {
        return res.status(400).json({
          message: "user not found",
        });
      }
      //we can also do this with mongoose validation methods using pre
      if (fromUser._id.toString() === toUser._id.toString()) {
        return res.status(400).json({
          message: "you can not request same person",
        });
      }

      //check if connection request already exist or not
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          {
            toUserId: fromUserId,
            fromUserId: toUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "connection already exist",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const requestData = await connectionRequest.save();
      res.json({
        message: `${fromUser.firstName} is ${status}  in ${toUser.firstName} `,
        data: {
          requestData,
        },
      });
    } catch (error) {
      res.status(400).send("Error : " + error.message);
    }
  }
);

//review connection request api

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const { status, requestId } = req.params;
      //validate status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status not allowed",
        });
      }

      //now validate request id and touserId is loggedInUser and status should be interested

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: user._id,
        status: "interested",
      });
      connectionRequest.status = status;

      if (!connectionRequest) {
        return res.status(404).json({
          message: "connection request not found",
        });
      }
      const data = await connectionRequest.save();

      res.send({
        message: "connection request " + status,
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "error occured in review api",
      });
    }
  }
);

module.exports = requestRouter;
