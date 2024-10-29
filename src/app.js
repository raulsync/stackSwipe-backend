const express = require("express")
const app = express() //instance of express
const { dbConnect } = require("./config/database")
const User = require("./models/user")
const port = 7777

app.post("/signup", async (req, res) => {
  const user = {
    firstName: "Rahul",
    lastName: "Anand",
    emailId: "rahul@anand.com",
    password: "rahul@123",
  }
  try {
    const userData = new User(user)
    await userData.save()
    res.send("user data saved successfully")
  } catch (error) {
    console.error("Something went wrong", error.message)
    res.status(400).send("some error occured")
  }
})

dbConnect()
  .then(() => {
    console.log("Database Connected Successfully")
    app.listen(port, () => {
      console.log("server is listening on port 7777")
    })
  })
  .catch((err) => {
    console.error("Database can not be connected", err.message)
  })
