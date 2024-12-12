const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tạo schema cho một người dùng
const registerUserSchema = new Schema(
  {
    user: {
      type: String,
      require: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
    },
    email: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Tạo model từ schema
const registerUser = mongoose.model("User", registerUserSchema);
module.exports = registerUser;
