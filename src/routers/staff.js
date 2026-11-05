import express from "express";
const router = express.Router();
import staffController from "../controllers/staff.js"

router
    .post("/staff", staffController.createStaff);

export default router;
