const mongoose = require("mongoose");

/*
a schema defines the structure of documents within a collection
*/

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      minLength: 3,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 8,
    },
    emailId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("please type correct gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    },
    skills: {
      type: [String],
      default: ["javascript", "nodejs"],
    },
  },
  { timestamps: true }
);

//creating model using schema
// const User = mongoose.model("User",userSchema);

// module.exports = User;   // we can import like this or

module.exports = mongoose.model("User", userSchema);
