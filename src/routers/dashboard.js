import express from "express";
import dashboardController from "../controllers/dashboard.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/dashboard", verifyToken, dashboardController.getDashboardData);

export default router;