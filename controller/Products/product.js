const newProduct = require("../../model/product");
const cloudinary = require("../../cloudinary/index"); // Import cấu hình Cloudinary
const { v4: uuidv4 } = require("uuid"); // Để tạo tên file duy nhất

const product = async (req, res) => {
  const files = req.files;

  const {
    productName,
    price,
    description,
    collection,
    subCollection,
    options,
  } = req.body;

  const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: `product_images/${uuidv4()}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(new Error("Error uploading to Cloudinary"));
            } else {
              resolve(result.secure_url); // Trả về URL của ảnh
            }
          }
        )
        .end(file.buffer); // Upload file lên Cloudinary
    });
  };

  try {
    // Tạo một bản ghi sản phẩm mới với trạng thái "đang xử lý ảnh"
    const addProduct = new newProduct({
      productName,
      price,
      collection,
      subCollection,
      options,
      size: JSON.parse(req.body.size),
      description,
      productImages: [], // Để trống ban đầu
    });

    await addProduct.save();

    // Trả response ngay lập tức về client
    res.json({
      message: "Sản phẩm đang được xử lý và sẽ hoàn tất sớm!",
      productId: addProduct._id, // Đưa ID sản phẩm để client theo dõi
    });

    // Tiến hành tải ảnh lên Cloudinary bất đồng bộ
    const imageUploadPromises = files.map((file) =>
      uploadImageToCloudinary(file)
    );
    const imageUrls = await Promise.all(imageUploadPromises);

    // Cập nhật URL ảnh vào database
    addProduct.productImages = imageUrls;
    await addProduct.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi trong quá trình xử lý sản phẩm" });
  }
};

module.exports = { product };
