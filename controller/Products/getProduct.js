const product = require("../../model/product");

const getProduct = async (req, res) => {
  const data = await product
    .find({
      collection: req.params.id,
    })
    .select("subCollection");

  res.status(200).json(data);
};

module.exports = { getProduct };
