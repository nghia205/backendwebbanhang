const express = require("express");
const { routeProduct } = require("./route/product");
const { routeMenu } = require("./route/menu/menu");
const { routeCollection } = require("./route/collection/collection");
const { routeUser } = require("./route/user");

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const mongoose = require("mongoose");
const dbURI = `mongodb+srv://dtn04999:${process.env.PASSWORD_MONGODB_ATLAS}@cluster0.jp8rc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`; // Địa chỉ MongoDB trên localhost

// Kết nối MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");
  })
  .catch((err) => {
    console.error("Lỗi kết nối MongoDB:", err);
  });

const app = express();

app.use(
  cors({
    origin: `${process.env.URL_NEXTJS}}`, // Cho phép tất cả các domain
    credentials: true, // Các header cho phép
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.json("nghia");
});

app.use("/", routeMenu);
app.use("/", routeUser);
app.use("/", routeProduct);
app.use("/", routeCollection);

// Sever
app.listen("8080", () => {
  console.log(`sever đang chạy http://${"127.0.0.1"}:${8080} `);
});
