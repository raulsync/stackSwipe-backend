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

const validateEditProfile = (req) => {
  // const user = req.body;
  const editAllowedFields = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "skills",
    "gender",
    "about",
  ];
  const isEditAllowedFields = Object.keys(req.body).every((field) =>
    editAllowedFields.includes(field)
  );
  return isEditAllowedFields;
};

//**TODO

// const validateUpdatePassword = async (req) => {
//   //get current password and new Password from req.body
//   const { currentPassword, newPassword } = req.body;

//   if (!currentPassword || !newPassword) {
//     throw new Error("All password fields are required");
//   }
//   if (currentPassword === newPassword) {
//     throw new Error("new password is same as current password");
//   }

//   //validate the password
//   if (
//     !validator.isStrongPassword(currentPassword) ||
//     !validator.isStrongPassword(newPassword)
//   ) {
//     throw new Error("password must be strong");
//   }
// };

module.exports = {
  validateSignUpData,
  validateEditProfile,
};
