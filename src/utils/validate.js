const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req;
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Please enter valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid Email");
  }
  // else if (!validator.isStrongPassword(password)) {
  //   throw new Error("Please enter valid password");
  // }
};

module.exports = {
  validateSignUpData,
};
