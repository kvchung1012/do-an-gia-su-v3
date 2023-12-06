const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/tutor-available-date.controller");
const tutorAvailableRoutes = express.Router();

/**
 * Mô tả router
 */
tutorAvailableRoutes.get("/", findAll);
tutorAvailableRoutes.get("/:id", findById);
tutorAvailableRoutes.post("/", create);
tutorAvailableRoutes.put("/:id", update);
tutorAvailableRoutes.delete("/:id", deleteById);

module.exports = tutorAvailableRoutes;
