const express = require("express")
const app = express() //instance of express
const { dbConnect } = require("./config/database")
const User = require("./models/user")
const port = 7777

//we use express.json() method as middleware for our all api to read the json data and convert it into js object

//if we not provide any route path to app.use then this will apply to all routes that we created in this file

app.use(express.json())

app.post("/signup", async (req, res) => {
  // Create a new instance of user model
  const user = new User(req.body)
  try {
    await user.save()
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
