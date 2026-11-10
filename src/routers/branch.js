import express from "express";
import branchController from "../controllers/branch.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/branches", verifyToken, checkRole(["admin"]), branchController.createBranch);
router.get("/branches", verifyToken, branchController.getAllBranches);
router.get("/branches/:id", verifyToken, branchController.getBranchById);
router.put("/branches/:id", verifyToken, checkRole(["admin"]), branchController.updateBranch);
router.delete("/branches/:id", verifyToken, checkRole(["admin"]), branchController.deleteBranch);

export default router;