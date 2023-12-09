const express = require("express");
const courseRoutes = require("./course.routes");
const categoryRoutes = require("./category.routes");
const tutorRoutes = require("./tutor.routes");
const authRoutes = require("./auth.routes");
const roleRoutes = require("./role.routes");
const schoolRoutes = require("./school.routes");
const courseProgramRoutes = require("./course-program.routes");
const bookedSessionRoutes = require("./booked-session.routes");
const tutoringContractRoutes = require("./tutoring-contract.routes");
const tutoringFeedbackRoutes = require("./tutoring-feedback.routes");
const tutorAvailableRoutes = require("./tutoring-available-date.routes");
const scheduleRoutes = require("./schedule.routes");
const userRoutes = require("./user.routes");
const uploadRoutes = require("./upload.routes");

const routes = express.Router();

routes.use("/course", courseRoutes);
routes.use("/category", categoryRoutes);
routes.use("/tutor", tutorRoutes);
routes.use("/auth", authRoutes);
routes.use("/role", roleRoutes);
routes.use("/school", schoolRoutes);
routes.use("/category-program", courseProgramRoutes);
routes.use("/booked-session", bookedSessionRoutes);
routes.use("/tutoring-contract", tutoringContractRoutes);
routes.use("/tutoring-feedback", tutoringFeedbackRoutes);
routes.use("/tutor-available-date", tutorAvailableRoutes);
routes.use("/schedule", scheduleRoutes);
routes.use("/user", userRoutes);
routes.use("/upload", uploadRoutes);

module.exports = routes;
