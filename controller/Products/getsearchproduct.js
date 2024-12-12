const product = require("../../model/product");

const filterSearch = {
  getSearchProduct: async (req, res) => {
    try {
      const data = await product
        .find(
          {
            productName: {
              $regex: req.params.id.trim(),
              $options: "i",
            },
          },
          {
            productName: 1, // Lấy trường `productName`
            price: 1, // Lấy trường `price`
            productImages: { $slice: 1 }, // Chỉ lấy 1 phần tử đầu tiên của mảng `image`
          }
        )
        .limit(20);
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json(err);
    }
  },

  getSearchProductAll: async (req, res) => {
    try {
      const data = await product.find({
        productName: {
          $regex: req.params.id.trim(),
          $options: "i",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json(err);
    }
  },

  getProductAll: async (req, res) => {
    const data = await product.find();
    res.status(200).json(data);
  },

  removeProductAll: async (req, res) => {
    try {
      const data = await product.deleteOne({ _id: req.query.id });
      res.status(200).json({ message: "Đã xóa sản phẩm", data });
    } catch (err) {
      res.status(403).json("lỗi");
    }
  },
};

module.exports = { filterSearch };
