const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("Sending Connection Request");
  res.send("connection request sent");
});

module.exports = requestRouter;
