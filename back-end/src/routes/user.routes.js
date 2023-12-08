const express = require("express");
const { getUserInfo } = require("../controllers/user.controller");
const userRouters = express.Router();

userRouters.get("/get-user-info/:id", getUserInfo);

module.exports = userRouters;
