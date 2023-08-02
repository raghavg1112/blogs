const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  c_password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const User = new mongoose.model("USER", userschema);
module.exports = User;
