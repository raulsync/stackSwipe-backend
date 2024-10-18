const express = require("express");

const app = express(); //instance of express

const port = 7777;

app.use("/", (req, res) => {
  res.send("Hello from namaste dashboard");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello");
});

app.use("/namaste", (req, res) => {
  res.send("Namaste People");
});

app.use("/test", (req, res) => {
  res.send("Hello from test route");
});

app.listen(port, () => {
  console.log("server is listening on port 7777");
});
