const products = require("../../model/product");

const getProductHome = async (req, res) => {
  const data = await products.find().limit(30);
  res.status(200).json(data);
};

module.exports = { getProductHome };
