const registerUser = require("../model/register");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = await new registerUser({
      email: req.body.email,
      password: hashed,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      // Kiểm tra lỗi trùng lặp
      return res.status(400).json("Email already exists");
    }
    res.status(500).json(err);
  }
};

module.exports = { register };
