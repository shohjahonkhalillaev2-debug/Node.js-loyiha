import express from "express";
import userRouter from "./routers/index.js";
import { configDotenv } from "dotenv";
import main from "./routers/index.js";

configDotenv();
const app = express();
app.use(express.json());
app.use(main);

app.listen(process.env.PORT, () => console.log("Server is running"));
