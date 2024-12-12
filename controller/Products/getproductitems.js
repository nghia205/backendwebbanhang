const product = require("../../model/product");

const getProductItems = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await product.findOne({ _id: id });
    res.json(data);
  } catch (err) {
    res.status(402).json("Không có sản phẩm này");
  }
};

module.exports = { getProductItems };
