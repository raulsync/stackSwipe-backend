const mongoose = require("mongoose")

/*
a schema defines the structure of documents within a collection
*/

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  emailId: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
})

//creating model using schema
// const User = mongoose.model("User",userSchema);

// module.exports = User;   // we can import like this or

module.exports = mongoose.model("User", userSchema)
