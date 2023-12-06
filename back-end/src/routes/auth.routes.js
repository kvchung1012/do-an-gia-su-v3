const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const authRouters = express.Router();

authRouters.post("/login", login);
authRouters.post("/register", register);

module.exports = authRouters;
