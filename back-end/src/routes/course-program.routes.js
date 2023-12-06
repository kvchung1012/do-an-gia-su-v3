const express = require("express");
const {
  create,
  update,
  deleteById,
  createPhase,
  updatePhase,
  deletePhaseById,
} = require("../controllers/course-program.controller");
const courseProgramRoutes = express.Router();

courseProgramRoutes.post("/:id", create);
courseProgramRoutes.put("/:id", update);
courseProgramRoutes.delete("/:id", deleteById);

courseProgramRoutes.post("/phase/:id", create);
courseProgramRoutes.put("/phase/:id", update);
courseProgramRoutes.delete("/phase/:id", deleteById);

module.exports = courseProgramRoutes;
