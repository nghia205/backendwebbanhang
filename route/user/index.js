const express = require("express");
const { register } = require("../../controller/register");
const { login } = require("../../controller/login");
const routeUser = express.Router();

routeUser.post("/register", register);
routeUser.post("/login", login);

module.exports = { routeUser };
