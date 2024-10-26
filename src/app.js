const express = require("express");

const app = express(); //instance of express

const port = 7777;

//order of routes matter when we /hello/2 => it will go to /hello routes because first it check /hello string exist or not.

//if we use / as a path then after that if anything comes it will always go to / routes

// app.use("/", (req, res) => {
//   res.send("Hello from namaste dashboard");
// });

// app.use("/hello/2", (req, res) => {
//   res.send("Hello from /2");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });

// app.use("/namaste", (req, res) => {
//   res.send("Namaste People");
// });

/*

 * order of execution matter here if we test any route it start from here if path matched then it doesn't go to next route


 app.use("/user", (req, res) => {
   res.send("Testing app.use ! ");
 });

*/

/*
  ? => optional + => (repeatitive same char)  bc*cd=> bcafjahfhfcd => it means path starts with bc and in between we put any character and it ends with cd
  /.*baby$ / => it will match all path that ends with baby
  we can also use regex instead of string in route path
*/

// app.get(/.*ba$/, (req, res) => {
//   res.send({
//     userName: "Rahul Anand",
//     emailId: "rahul123@gmail.com",
//   });
// });

/*
  - Playing with query param and dynamic route param
  -req.query to get the urlquery param that is passed from client side
  -req.params to get the dynamic data that pass from url as a params
*/

app.get("/user/:userId/:password", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({
    userName: "Rahul Anand",
    emailId: "rahul123@gmail.com",
  });
});

//testing get call
// app.get("/user", (req, res) => {
//   res.send({
//     userName: "Rahul Anand",
//     emailId: "rahul123@gmail.com",
//   });
// });

app.post("/user", (req, res) => {
  console.log("Data save to database successfully");
  res.send("Data save to database");
});

app.delete("/user", (req, res) => {
  res.send("user data deleted from database successfully !");
});

app.use("/test", (req, res) => {
  res.send("Hello from test route");
});

app.listen(port, () => {
  console.log("server is listening on port 7777");
});
