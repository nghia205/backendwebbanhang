const registerUser = require("../model/register");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await registerUser.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("Wrong email!");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json("Wrong password!");
    }

    if (user && validPassword) {
      const payload = {
        id: user.id,
        admin: user.admin,
        user: user.user,
        email: user.email,
      };

      const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      const refresh_Token = jsonwebtoken.sign(
        payload,
        process.env.REFRESH_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .cookie("refreshToken", refresh_Token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .json({
          accessToken,
          refresh_Token,
          payload,
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { login };
