const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) console.log("connected");
  } catch (error) {
    console.log("Error in connecting to the db");
  }
};

module.exports = connectDB;
