const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function userAuth(req, res, next) {
  try {
    //read the token from req.cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login ... ");
    }
    //validate the token and find the user and send the user as response
    const decodedId = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id } = decodedId;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found !");
    }
    //attaching user to req;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
}

module.exports = {
  userAuth,
};
