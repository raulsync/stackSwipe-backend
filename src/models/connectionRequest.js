const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignore", "accepted", "rejected"],
        message: `{VALUE} is not a valid status`,
      },
      required: true,
    },
  },
  { timestamps: true }
);

const ConnectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = { ConnectionRequest };
