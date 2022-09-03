const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true,minlength: 6 },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true,minlength: 6 },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
