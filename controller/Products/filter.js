const product = require("../../model/product");
const Filter = require("../../classfilter/classfilter");
const Filters = async (req, res) => {
  const { sc, min, max, size } = req.query;

  try {
    if (!req.query?.sc & !req.query?.min & !req.query?.max & !req.query?.size) {
      const products = await product.find({
        collection: req.params.id,
      });
      res.status(200).json(products);
      return;
    }
    const products = await product.find({ collection: req.params.id });

    const filter = new Filter(products)
      .subCollection(sc)
      .value(min, max)
      .size(size);

    const fil = await filter.product;

    res.status(200).json(fil);
  } catch (error) {
    // Xử lý lỗi
    console.log("lỗi");
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Filters };
