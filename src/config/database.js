const mongoose = require("mongoose")

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:CgnJOXgoRIFIZa0i@namastebackend.qfixi.mongodb.net/stackSwipe"
  )
}

module.exports = { dbConnect }
