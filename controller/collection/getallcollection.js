const CollectionModel = require("../../model/menu");

const getAllCollection = async (req, res) => {
  try {
    // Chỉ lấy các trường cần thiết từ MongoDB để giảm tải dữ liệu
    const collections = await CollectionModel.findOne(
      {},
      { Menucollection: 1, _id: 0 }
    );

    // Tìm Menucollection ngay trong quá trình xử lý
    const menuCollection = collections.Menucollection;

    if (!menuCollection) {
      return res.status(404).json({ message: "No collection found" });
    }

    // Tạo dữ liệu cần trả về mà không dùng biến trung gian dư thừa
    const mappedCollections = menuCollection.map((item) => ({
      collection: item.name,
    }));

    // Trả về dữ liệu
    res.status(200).json(mappedCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCollection };
