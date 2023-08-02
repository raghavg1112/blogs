const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/userSchema");
const Blog = require("../model/blog_schema");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const setwebtoken = "Mynameunf4uifnu4nfui4fnhubschbehjoidoidn";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ success: false, message: "enter credentials correctly" });
  }
  const find = await User.findOne({ email: username });
  if (!find) {
    return res
      .status(201)
      .json({ success: false, message: "Username doesn't exist's" });
  }
  const check = await bcrypt.compare(password, find.password);
  if (!check) {
    return res
      .status(201)
      .json({ success: false, message: "Incorrect Password" });
  }
  const data = {
    user: {
      id: find.id,
    },
  };
  const authToken = jwt.sign(data, setwebtoken);
  return res.status(201).json({
    success: true,
    message: "Login Successfull",
    authToken: authToken,
    user_id: find.email,
    name: find.name,
  });
});
router.post("/googleLogin", (req, res) => {
  const { email } = req.body;
  User.find({ email: email });
  if (!find) {
    const user = new User({ email: email });
    User.save()
      .then()
      .catch((err) => {
        return res
          .status(200)
          .json({ success: false, message: "Please Try again" });
      });
  }
  return res.status(200).json({ success: true });
});
router.post("/signUp", async (req, res) => {
  const { name, password, c_password } = req.body;
  const email = req.body.username;

  if (!name || !email || !password || !c_password) {
    return res
      .status(201)
      .json({ success: false, message: "fill all credentials properly" });
  }
  if (password != c_password) {
    return res.status(201).json({
      success: false,
      message: "password and confirm password dont match",
    });
  }
  const found = await User.findOne({ email: email });
  if (found) {
    return res
      .status(201)
      .json({ success: false, message: "email already exists" });
  } else {
    const secure_pass = await bcrypt.hash(password, 10);
    const secure_c_pass = await bcrypt.hash(c_password, 10);

    const user = new User({
      name: name,
      email: email,
      password: secure_pass,
      c_password: secure_c_pass,
    });
    user.save().then(() => {
      return res
        .status(201)
        .json({ success: true, message: "registered successfull" });
    });
  }
});

router.get("/my_old_blogs", async (req, res) => {
  const user_id = req.query.user_id;
  let blogs = await Blog.find({ user_id: user_id });
  console.log(`my old blogs`);
  console.log(blogs);
  if (!blogs) {
    res
      .status(200)
      .json({ success: false, message: "Failed to load Your Old Blogs" });
  }
  res.status(200).json({ success: true, data: blogs });
});

router.get("/get_all_blogs", async (req, res) => {
  const blogs = await Blog.find({});

  if (!blogs) {
    return res.status(200).json({
      success: false,
      message: "failed to load Public blogs!! Please RELOAD!!",
    });
  }
  return res.status(200).json({ success: true, data: blogs });
});

router.post("/create_blog", async (req, res) => {
  const { blog, title, img, user_id } = req.body;

  const create_blog = new Blog({
    user_id: user_id,
    blog: blog,
    title: title,
    img: img,
  });
  const check_save = await create_blog.save();
  if (!check_save) {
    return res
      .status(200)
      .json({ success: false, message: "Unable to Create Blog" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Blog Created Successfully" });
});

router.post("/delete_blog", async (req, res) => {
  console.log(`delete request`);
  const { blog_id } = req.body;
  const check = await Blog.remove({ _id: blog_id });
  if (!check) {
    return res
      .status(200)
      .json({ success: false, message: "Unable to Delete" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Successfully Deleted" });
});

router.post("/edit_blog", async (req, res) => {
  console.log(`edit`);
  const blog = req.body;
  console.log(req.body);
  const filter = { _id: blog._id };
  const update = {
    _id: blog._id,
    blog: blog.blog,
    title: blog.title,
    img: blog.img,
  };
  Blog.findOneAndUpdate(filter, update, (err, data) => {
    console.log(`updating`);
    if (err) {
      return res
        .status(200)
        .json({ success: false, message: "failed to edit" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully edited" });
  });
});

router.get("/getToBeEditedBlog", async (req, res) => {
  const blog_id = req.query.blog_id;
  let blog = await Blog.find({ _id: blog_id });

  console.log(blog);

  if (!blog) {
    res.status(200).json({ success: false, message: "Failed to load Blog" });
  }
  res.status(200).json({ success: true, data: blog });
});
module.exports = router;
