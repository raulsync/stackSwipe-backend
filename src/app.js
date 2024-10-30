const express = require("express");
const app = express(); //instance of express
const { dbConnect } = require("./config/database");
const User = require("./models/user");
const port = 7777;

//we use express.json() method as middleware for our all api to read the json data and convert it into js object

//if we not provide any route path to app.use then this will apply to all routes that we created in this file

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Create a new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    console.error("Something went wrong", error.message);
    res.status(400).send("some error occured " + error.message);
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
    console.log("something went wrong");
    res.status(400).send("some error occured " + error.message);
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
    res.status(400).send("some error occured " + err.message);
  }
});

// update => user

app.patch("/user", async (req, res) => {
  const userData = req.body;
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndUpdate(userId, userData, {
      runValidators: true,
      returnDocument: "after",
    });
    console.log(user);

    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong " + error.message);
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
    res.status(400).send("something went wrong " + error.message);
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
