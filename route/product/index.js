const express = require("express");
const { product } = require("../../controller/Products/product");
const { getProduct } = require("../../controller/Products/getProduct");
const routeProduct = express.Router();
const Authenrization = require("../../authenrization/authenrization");

const multer = require("multer");
const {
  getProductItems,
} = require("../../controller/Products/getproductitems");
const { getProductHome } = require("../../controller/Products/getproducthome");
const { Filters } = require("../../controller/Products/filter");
const { filterSearch } = require("../../controller/Products/getsearchproduct");

const upload = multer();

routeProduct.post(
  "/addProduct",
  Authenrization,
  upload.array("productImages"),
  product
);
routeProduct.get("/subcollection/:id", getProduct);
routeProduct.get("/productitems/:id", getProductItems);
routeProduct.get("/producthome", getProductHome);
routeProduct.get("/filter/:id", Filters);
routeProduct.get("/search/:id", filterSearch.getSearchProduct);
routeProduct.get("/searchproductall/:id", filterSearch.getSearchProductAll);
routeProduct.get("/product/all", filterSearch.getProductAll);
routeProduct.get("/removeproduct/all", filterSearch.removeProductAll);

module.exports = { routeProduct };
