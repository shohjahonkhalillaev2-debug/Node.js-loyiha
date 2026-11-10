import express from "express";
const router = express.Router();
import staffController from "../controllers/staff.js";
import validation from "../middleware/validation.js";

router
    .get("/staff",staffController.getAllstaff )
    .post("/staff", validation.staffCreate, staffController.createStaff)
    .delete("/staff/:userId", staffController.deleteStaff )
export default router;

