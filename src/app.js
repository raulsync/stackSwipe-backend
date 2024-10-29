const express = require("express")
const app = express() //instance of express
const { dbConnect } = require("./config/database")
const port = 7777

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
