const menuCollection = require("../model/menu");

const Menu = {
  addCollection: async (req, res) => {
    const result = await menuCollection.findOne();

    if (result) {
      // Tìm xem có phần tử nào trong Menucollection có name trùng với req.body.menuCollection không
      const existingMenu = await menuCollection.findOne({
        "Menucollection.name": req.body.menuCollection,
      });

      const existingSubCollection = await menuCollection.findOne({
        "Menucollection.SubCollection.name": req.body.SubCollection,
      });
      const existingOptionSubCollection = await menuCollection.findOne({
        "Menucollection.SubCollection.options": req.body.OptionSubCollection,
      });

      if (existingMenu) {
        // Nếu có, thêm SubCollection vào đúng phần tử Menucollection có name trùng
        if (existingSubCollection) {
          if (existingOptionSubCollection) {
            res.json("Trùng Option!");

            return;
          } else {
            const document = await menuCollection.findOne({
              "Menucollection.name": req.body.menuCollection,
              "Menucollection.SubCollection.name": req.body.SubCollection,
            });

            if (!document) {
              throw new Error("Không tìm thấy dữ liệu phù hợp!");
            }

            // Tìm chỉ số của Menucollection
            const menuIndex = document.Menucollection.findIndex(
              (item) => item.name === req.body.menuCollection
            );

            // Tìm chỉ số của SubCollection bên trong Menucollection
            const subIndex = document.Menucollection[
              menuIndex
            ].SubCollection.findIndex(
              (subItem) => subItem.name === req.body.SubCollection
            );

            if (menuIndex === -1 || subIndex === -1) {
              throw new Error(
                "Không tìm thấy Menucollection hoặc SubCollection!"
              );
            }
            const updatePath = `Menucollection.${menuIndex}.SubCollection.${subIndex}.options`;

            await menuCollection.updateOne(
              { _id: document._id },
              {
                $push: {
                  [updatePath]: req.body.OptionSubCollection,
                },
              }
            );
            res.json("Thêm Options mới thành công!");
          }
        } else {
          const a = await menuCollection.updateOne(
            {
              "Menucollection.name": req.body.menuCollection,
            },
            {
              $push: {
                "Menucollection.$.SubCollection": {
                  name: req.body.SubCollection,
                  options: [req.body.OptionSubCollection],
                },
              },
            }
          );

          res.json("Thêm SubCollection và Options mới thành công!");
        }
      } else {
        await menuCollection.findOneAndUpdate(
          {},
          {
            $push: {
              Menucollection: {
                name: req.body.menuCollection,
                SubCollection: [
                  {
                    name: req.body.SubCollection,
                    options: [req.body.OptionSubCollection],
                  },
                ],
              },
            },
          }
        );
        res.json("Thêm Menucollection mới thành công!");
      }
    } else {
      const menu = new menuCollection({
        Menucollection: [
          {
            name: req.body.menuCollection,
            SubCollection: [
              {
                name: req.body.SubCollection,
                options: [req.body.OptionSubCollection],
              },
            ],
          },
        ],
      });

      try {
        const menuadd = await menu.save();
        res.json("Thêm Thành Công");
      } catch (err) {
        console.log(err);
      }
    }

    //
  },
  getCollection: async (req, res) => {
    const collection = await menuCollection.findOne();
    res.status(200).json(collection);
  },
};

module.exports = { Menu };
