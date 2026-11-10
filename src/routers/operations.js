import express from "express";
import opsController from "../controllers/lms.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/lessons", verifyToken, checkRole(["admin", "teacher"]), opsController.createLesson);
router.get("/lessons/group/:groupId", verifyToken, opsController.getLessonsByGroup);


router.post("/attendance", verifyToken, checkRole(["admin", "teacher"]), opsController.recordAttendance);
router.get("/attendance/lesson/:lessonId", verifyToken, opsController.getAttendanceByLesson);


router.post("/payments", verifyToken, checkRole(["admin", "stuff"]), opsController.makePayment);
router.get("/payments/student/:studentId", verifyToken, opsController.getStudentPayments);

router.post("/tests", verifyToken, checkRole(["admin", "teacher"]), opsController.addTest);
router.get("/tests/lesson/:lessonId", verifyToken, opsController.getTestsByLesson);

export default router;