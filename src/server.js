// import express from "express";
// import userRouter from "./routers/users.js";
// import { configDotenv } from "dotenv";

// configDotenv();
// const app = express();
// app.use(userRouter);

// app.listen(process.env.PORT, () => console.log("Server is runnig..."));

import express from "express";
import pool from "./config/db.js";
import users from "./controllers/users.js";

const app = express();
app.use(express.json());

// Barcha foydalanuvchilarni olish marshruti (route)
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // result.rows ichida qatorlar massivi bo'ladi
  } catch (error) {
    console.error(error);
    // console.log("Path: ", error.path);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// Yangi foydalanuvchi qo'shish marshruti (parametrlar bilan)
app.post("/users", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    // SQL Injection dan himoya qilish uchun $1, $2 ishlatiladi
    const queryText =
      "INSERT INTO users(name, age, password) VALUES($1, $2, $3) RETURNING *";
    const result = await pool.query(queryText, [name, age, password]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Foydalanuvchi qo'shib bo'lmadi" });
  }
});
app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await pool.query("select * from users where username = $1", [
    username,
  ]);

  user = user.rows;
  if (!user.length) {
    return res
      .status(400)
      .json({ status: 400, message: "Bunday foydalanuvchi topilmadi" });
  }
  if (password != user[0].password) {
    return res
      .status(400)
      .json({ statu: 400, message: "username yoki parol xato" });
  }
  return res
    .status(200)
    .json({ status: 200, message: "muvofaqiyatli kirdingiz", data:user[0] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
