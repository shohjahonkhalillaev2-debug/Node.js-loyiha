import { Router } from "express";
import authRouter from "./auth.js";
import staffRouter from "./staff.js";
import branchRouter from "./branch.js";
import studentRouter from "./student.js";
import teacherRouter from "./teacher.js";
import courseRouter from "./course.js";
import groupRouter from "./group.js";
import dashboardRouter from "./dashboard.js";
import opsRouter from "./operations.js";

const main = Router();

main.use("/api/v1", authRouter);
main.use("/api/v1", staffRouter);
main.use("/api/v1", branchRouter);
main.use("/api/v1", studentRouter);
main.use("/api/v1", teacherRouter);
main.use("/api/v1", courseRouter);
main.use("/api/v1", groupRouter);
main.use("/api/v1", dashboardRouter);
main.use("/api/v1", opsRouter);

export default main;
