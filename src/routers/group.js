import express from "express";
import groupController from "../controllers/group.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/groups", verifyToken, groupController.createGroup);
router.get("/groups", verifyToken, groupController.getAllGroups);
router.post(
  "/groups/add-student",
  verifyToken,
  groupController.addStudentToGroup,
);

export default router;
