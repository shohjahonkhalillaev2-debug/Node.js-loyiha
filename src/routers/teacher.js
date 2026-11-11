import express from "express";
import teacherController from "../controllers/teacher.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/teachers", verifyToken, checkRole(["adminstrator"]), teacherController.createTeacher);
router.get("/teachers", verifyToken, teacherController.getAllTeachers);
router.get("/teachers/:id", verifyToken, teacherController.getTeacherById);
router.put("/teachers/:id", verifyToken, checkRole(["admin"]), teacherController.updateTeacher);
router.delete("/teachers/:id", verifyToken, checkRole(["admin"]), teacherController.deleteTeacher);

export default router;