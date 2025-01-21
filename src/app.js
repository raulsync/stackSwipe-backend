const express = require("express");
const { dbConnect } = require("./config/database");
const User = require("./models/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express(); //instance of express
dotenv.config();

const PORT = process.env.PORT || 7777;

//we use express.json() method as middleware for our all api to read the json data and convert it into js object

//if we not provide any route path to app.use then this will apply to all routes that we created in this file

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

/*

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
    // console.log(user);

    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

*/

dbConnect()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, () => {
      console.log("server is listening on port 7777 ");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected", err.message);
  });
