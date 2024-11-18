const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //Create connection/link between two collections
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

//indexing

//we use schema.index to create index
//when our db grow then the query becomes very expensive so we need to put indexes on some schema.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("you can not sent request to yourself");
  }
  next();
});

const ConnectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = { ConnectionRequest };
