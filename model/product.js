const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tạo schema cho một người dùng
const productSchema = new Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    size: {
      type: [String],
      require: true,
    },
    collection: {
      type: String,
      require: true,
    },
    subCollection: {
      type: String,
    },
    options: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    productImages: { type: [String], required: true },
  },
  { timestamps: true }
);

// Tạo model từ schema

module.exports = mongoose.model("products", productSchema);
