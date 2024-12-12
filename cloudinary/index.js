const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgrxafskn", // Thay YOUR_CLOUD_NAME bằng Cloud Name của bạn
  api_key: "495569283834763", // Thay YOUR_API_KEY bằng API Key của bạn
  api_secret: "CAWZmQvjHb5RNcYuCyJk2s004f0", // Thay YOUR_API_SECRET bằng API Secret của bạn
});

module.exports = cloudinary;
