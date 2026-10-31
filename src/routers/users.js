import express from "express"
import userController from "../controllers/users.js"


const router = express.Router()

router.get("/api/users",userController.getAllUSers,)

export default router