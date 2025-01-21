const mongoose = require("mongoose");

const dbConnect = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Mongo Uri is not defined in environment variable");
  } else {
    await mongoose.connect(mongoUri);
  }
};

module.exports = { dbConnect };
