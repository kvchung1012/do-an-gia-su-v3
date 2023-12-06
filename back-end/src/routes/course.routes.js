const express = require("express");
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  getListCourseHome,
} = require("../controllers/course.controller");
const courseRoutes = express.Router();

courseRoutes.get("/", findAll);
courseRoutes.get("/:id", findById);
courseRoutes.post("/:id", create);
courseRoutes.put("/:id", update);
courseRoutes.delete("/:id", deleteById);
courseRoutes.get("/getlistcourselimit", getListCourseHome);

module.exports = courseRoutes;
