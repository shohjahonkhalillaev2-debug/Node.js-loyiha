import pool from "../config/db.js";
import argon2 from "argon2";
import jwtUtil from "../utilities/jwt.js";

class AuthService {
  async login(req) {
    const { phone, password } = req.body;

    let userQuery = await pool.query(`SELECT * FROM staff WHERE phone = $1`, [
      phone,
    ]);
    let table = "staff";

    if (!userQuery.rows.length) {
      userQuery = await pool.query(`SELECT * FROM teachers WHERE phone = $1`, [
        phone,
      ]);
      table = "teachers";
    }

    if (!userQuery.rows.length) {
      userQuery = await pool.query(`SELECT * FROM students WHERE phone = $1`, [
        phone,
      ]);
      table = "students";
    }

    if (!userQuery.rows.length) {
      return { status: 404, message: "Foydalanuvchi topilmadi" };
    }

    const user = userQuery.rows[0];

    if (user.status === "inactive") {
      return { status: 403, message: "Profilingiz nofaol holatda" };
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return { status: 400, message: "Telefon raqam yoki parol xato" };
    }

    const token = jwtUtil.sign({
      id: user.id,
      role: user.role || (table === "teachers" ? "teacher" : "student"),
    });

    return {
      status: 200,
      message: "Tizimga muvaffaqiyatli kirildi",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role || (table === "teachers" ? "teacher" : "student"),
      },
    };
  }
}

export default new AuthService();
