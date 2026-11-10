import express from "express";
import studentController from "../controllers/student.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/students", verifyToken, checkRole(["admin", "stuff"]), studentController.createStudent);
router.get("/students", verifyToken, studentController.getAllStudents);
router.get("/students/:id", verifyToken, studentController.getStudentById);
router.put("/students/:id", verifyToken, checkRole(["admin", "stuff"]), studentController.updateStudent);
router.delete("/students/:id", verifyToken, checkRole(["admin", "stuff"]), studentController.deleteStudent);
router.post("/students/activate/:id", verifyToken, checkRole(["admin", "stuff"]), studentController.activateStudent);

export default router;