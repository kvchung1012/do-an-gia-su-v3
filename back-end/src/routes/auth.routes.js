const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const authRouters = express.Router();
const uploadCloud = require("../middlewares/uploader");

authRouters.post("/login", login);
authRouters.post("/register", uploadCloud.single("file"), register);

module.exports = authRouters;
