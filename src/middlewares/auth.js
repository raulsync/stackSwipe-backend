function adminAuth(req, res, next) {
  const token = "rahul";
  const isAuth = token === "rahul";
  if (isAuth) {
    console.log("you are authorized");
    next();
  } else {
    console.log("you are not authorized");
    res.status(401).send("you are unauthorized");
  }
}

function userAuth(req, res, next) {
  const token = "abhi";
  const isAuth = token === "abhi";
  if (isAuth) {
    console.log("user is authorized");
    next();
  } else {
    console.log("user is not authorized");
    res.status(401).send("user is not authorized");
  }
}

module.exports = {
  adminAuth,
  userAuth,
};
