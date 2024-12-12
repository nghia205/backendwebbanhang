const express = require("express");
const { Menu } = require("../../controller/menu");
const Authenrization = require("../../authenrization/authenrization");

const routeMenu = express.Router();

routeMenu.post("/menu", Authenrization, Menu.addCollection);
routeMenu.get("/menu/add", Menu.getCollection);

module.exports = { routeMenu };
