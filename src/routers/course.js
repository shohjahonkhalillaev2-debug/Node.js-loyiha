
import express from "express";
import courseController from "../controllers/course.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();
router.post("/courses", verifyToken, checkRole(["admin"]), courseController.createCourse);
router.get("/courses", verifyToken, courseController.getAllCourses);
router.get("/courses/:id", verifyToken, courseController.getCourseById);
router.put("/courses/:id", verifyToken, checkRole(["admin"]), courseController.updateCourse);
router.delete("/courses/:id", verifyToken, checkRole(["admin"]), courseController.deleteCourse);

export default router;