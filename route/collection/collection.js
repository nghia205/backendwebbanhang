const express = require("express");
const {
  getAllCollection,
} = require("../../controller/collection/getallcollection");

const routeCollection = express.Router();

routeCollection.get("/collection", getAllCollection);

module.exports = { routeCollection };
