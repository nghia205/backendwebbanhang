const express = require("express");
const { routeProduct } = require("./route/product");
const { routeRegisterUser } = require("./route/user/register");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { routeLogin } = require("./route/login/login");
const dotenv = require("dotenv");
const { routeMenu } = require("./route/menu/menu");

dotenv.config();

const dbURI =
  "mongodb+srv://dtn04999:HYXLI8lOVW9PFkr5@cluster0.jp8rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Địa chỉ MongoDB trên localhost

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
    origin: "*", // Cho phép tất cả các domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP cho phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các header cho phép
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.json("nghia");
});

app.use("/addProduct", routeProduct);
app.use("/register", routeRegisterUser);
app.use("/login", routeLogin);
app.use("/menu", routeMenu);

// Sever
app.listen("8080", () => {
  console.log(`sever đang chạy http://${"127.0.0.1"}:${8080} `);
});
