const mongoose = require("mongoose");
const validator = require("validator");

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
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      trim: true,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      // maxLength: 16,
      validate: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is not strong ");
        }
      },
    },
    emailId: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Your email is not in proper format ");
        }
      },
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
      validate: (value) => {
        if (!validator.isURL(value)) {
          throw new Error("Url is incorrect");
        }
      },
    },
    skills: {
      type: [String],
      default: ["javascript", "nodejs"],
    },
    about: {
      type: String,
      default: "this is about section",
    },
  },
  { timestamps: true }
);

//creating model using schema
// const User = mongoose.model("User",userSchema);

// module.exports = User;   // we can import like this or

module.exports = mongoose.model("User", userSchema);
