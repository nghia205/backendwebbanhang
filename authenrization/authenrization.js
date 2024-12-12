const jwt = require("jsonwebtoken");

const Authenrization = async (req, res, next) => {
  myCookie = req.cookies.accessToken;
  console.log("Cookies nhận được:", myCookie);
  if (myCookie) {
    console.log(`Cookie giá trị:`);
  } else {
    console.log('Không có cookie "myCookieName"!');
  }
  if (!myCookie) {
    return res.status(401).json({ message: "Token không được cung cấp!" });
  }

  try {
    // Xác minh token
    const decoded = await jwt.verify(myCookie, process.env.JWT_SECRET);
    if (!decoded.admin) {
      res.status(403).json("Bạn không phải là admin");
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ!" });
  }
};

module.exports = Authenrization;
