const mongoose = require("mongoose");
const blog_schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PNNRDmwDV_an6mG4zJJyuV3ixJDdEDnIeq_jgXR_RmGHc4qGFI8Fkg2dPq3qcoD_ir0&usqp=CAU",
  },
  blog: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const blog = mongoose.model("Blog", blog_schema);
module.exports = blog;
