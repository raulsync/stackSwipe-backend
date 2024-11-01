const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { dbConnect } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const app = express(); //instance of express\

const port = 7777;

//we use express.json() method as middleware for our all api to read the json data and convert it into js object

//if we not provide any route path to app.use then this will apply to all routes that we created in this file

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate user data
    // console.log(req.body);
    validateSignUpData(req.body);

    const { firstName, lastName, emailId, password } = req.body;
    // console.log(firstName, lastName, emailId, password);
    //encrypt the password
    //  bcrypt takes second arguement as saltrounds like how much tight secure our password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    // Create a new instance of user model
    //we never pass the req.body to the database we first destructure it and save it to db
    console.log(password);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    console.error("Error in signup ", error.message);
    res.status(400).send("Error : " + error.message);
  }
});

//Login Api

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(password);

    //check if emailId is valid or not
    if (!validator.isEmail(emailId)) {
      throw new Error("please enter valid email");
    }
    const user = await User.findOne({ emailId });
    console.log(user.password);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }
    res.send("Login Successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//GET - user by email
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  // console.log(userEmail)

  try {
    // const user = await User.findOne({ emailId: userEmail })
    const user = await User.findById(userId);
    if (user != 0) {
      res.send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    // console.log("something went wrong");
    res.status(400).send("Error : " + error.message);
  }
});

//DELETE => USER

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // await User.findOneAndDelete(userId);
    await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted succesfully");
  } catch (err) {
    cosole.log("something happened in delete user api");
    res.status(400).send("Error " + err.message);
  }
});

// update => user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;
  try {
    const UPDATE_ALLOWED = [
      "gender",
      "password",
      "age",
      "about",
      "photoUrl",
      "skills",
    ];

    const isAllowedUpdates = Object.keys(userData).every((k) => {
      return UPDATE_ALLOWED.includes(k);
    });

    // console.log(isAllowedUpdates);
    if (!isAllowedUpdates) {
      throw new Error("user not updated");
    }
    const user = await User.findByIdAndUpdate(userId, userData, {
      runValidators: true,
      returnDocument: "after",
    });
    console.log(user);

    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

//Get - Feed Data => Get All user Data

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
    console.log("something went wrong in getting userData");
  }
});

dbConnect()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, () => {
      console.log("server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected", err.message);
  });
