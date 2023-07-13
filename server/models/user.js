const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", UserSchema);