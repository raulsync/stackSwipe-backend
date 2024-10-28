const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express(); //instance of express

const port = 7777;

/*
order of routes matter when we /hello/2 => it will go to /hello routes
because first it check /hello string exist or not.
*/
/*
***if we use / as a path then after that if anything comes
 it will always go to / routes
 /*
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

* order of execution matter here if we test any route it start from here
 if path matched then it doesn't go to next route

 app.use("/user", (req, res) => {
   res.send("Testing app.use ! ");
 });

*/

/*
  ? => optional + => (repeatitive same char)
  bc*cd=> bcafjahfhfcd => it means path starts with bc and in
   between we put any character and it ends with
  /.*baby$ / => it will match all use next method
 path that ends with baby
  we can also use regex instead of string in route path
*/

// app.get(/.*ba$/, (req, res) => {
//   res.send({
//     userName: "Rahul Anand",
//     emailId: "rahul123@gmail.com",
//   });
// });

/*
  -Playing with query param and dynamic route param
  -req.query to get the urlquery param that is passed from client side
  -req.params to get the dynamic data that pass from url as a params
*/

// app.get("/user/:userId/:password", (req, res) => {
//   console.log(req.query);
//   console.log(req.params);
//   res.send({
//     userName: "Rahul Anand",
//     emailId: "rahul123@gmail.com",
//   });
// });

/*
  we can also wrap route handler in array it will not gives any error
*/

// app.use(
//   "/user",
//   [
//     (req, res, next) => {
//       console.log("Response 1 !!!");
//       /*
//   *** if we do not sent the response from server
//   and if url get hit by user or in postman
//   then it run in loop it will
//   resolve the request BUT IT TAKES TIMES

//   --- we can also make multiple route handler inside app.use or app.get/put/post/delete---
//   */
//       // res.send("1st Response");

//       /*
//  this route never goes to the next route because the response
//  is send to the client

//  so here we use next() method that is provided by expressJs as a
//  third arguement in route handler to handle this type of scenario
//  */
//       next();
//     },
//     (req, res, next) => {
//       console.log("2nd Response");
//       // res.send("2nd Response");
//       next();
//     },
//     (req, res, next) => {
//       console.log("3rd Response");

//       // res.send("3rd Response !! ");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     console.log("4th Response");
//     // res.send("4th Response !! ");
//     //if we do not provide next route handler after next then it gives error bcs express expect next route handle when we use next method
//     next();
//   },
//   (req, res, next) => {
//     console.log("5th Response");
//     // if we do not send back the response it will run in loop
//     res.send("5th Response !! ");
//     // next();
//   },
// );

/*
 *** We can do above like separate also
 */

//this is basically a chain of middleware it is like writing some logic but not send the response back from that function and we have next() method to pass the execution to next route,

//response send back to client from middleware/route that is known as route handler.
// app.use("/", (req, res, next) => {
//   console.log("log from / route");
//   // res.send(" /route handler");
//   next();
// });

// app.get("/user", (req, res) => {
//   console.log("log from /user route");
//   res.send("response send from /user route");
// });

//testing get call
// app.get("/user", (req, res) => {
//   res.send({
//     userName: "Rahul Anand",
//     emailId: "rahul123@gmail.com",
//   });
// });

// app.post("/user", (req, res) => {
//   console.log("Data save to database successfully");
//   res.send("Data save to database");
// });

// app.delete("/user", (req, res) => {
//   res.send("user data deleted from database successfully !");
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from test route");
// });

//Practise For MiddleWare  //we can use app.use or app.all for middleware

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  console.log("all user");
  res.send("all user data");
});

//here we see that our code is repeatitive so we wrap logic inside middleware
// we can now refactor in folder structure to keep clean
app.get("/admin/getData", (req, res) => {
  // const token = "abhii";
  // const isAdminAuth = token === "abhi";

  // if (isAdminAuth) {
  //   console.log("Admin is authorized");
  res.send("All data sent");
  // } else {
  //   res.status(401).send("admin is unauthorized");
  // }
});

app.get("/admin/deleteData", (req, res) => {
  // const token = "rahul";
  // const isAdminAuth = token === "rahul";

  // if (isAdminAuth) {
  //   console.log("admin is authorized");

  res.send("deleted all data");

  // } else {
  //   res.status(401).send("admin is not authorized");
  // }
});

app.listen(port, () => {
  console.log("server is listening on port 7777");
});
