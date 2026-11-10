import pool from "../config/db.js";
import argon2 from "argon2";

class StudentService {
  async createStudent(req) {
    const { fullname, phone, password, branch_id } = req.body;
    const hashPassword = await argon2.hash(password);

    await pool.query(
      `INSERT INTO students (fullname, phone, password, branch_id, status) VALUES ($1, $2, $3, $4, 'active')`,
      [fullname, phone, hashPassword, branch_id],
    );

    return { status: 201, message: "Talaba muvaffaqiyatli ro'yxatga olindi" };
  }

  async getAllStudents() {
    const result = await pool.query(
      `SELECT s.id, s.fullname, s.phone, s.status, s.created_at, b.name as branch_name 
       FROM students s 
       LEFT JOIN branches b ON s.branch_id = b.id 
       ORDER BY s.id ASC`,
    );
    return { status: 200, data: result.rows };
  }

  async getStudentById(req) {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT s.id, s.fullname, s.phone, s.status, s.branch_id, b.name as branch_name 
       FROM students s 
       LEFT JOIN branches b ON s.branch_id = b.id 
       WHERE s.id = $1`,
      [id],
    );

    if (!result.rows.length)
      return { status: 404, message: "Talaba topilmadi" };
    return { status: 200, data: result.rows[0] };
  }

  async updateStudent(req) {
    const { id } = req.params;
    const { fullname, phone, password, branch_id } = req.body;

    let query = `UPDATE students SET fullname = COALESCE($1, fullname), phone = COALESCE($2, phone), branch_id = COALESCE($3, branch_id)`;
    let values = [fullname || null, phone || null, branch_id || null];

    if (password) {
      const hashPassword = await argon2.hash(password);
      query += `, password = $4 WHERE id = $5`;
      values.push(hashPassword, id);
    } else {
      query += ` WHERE id = $4`;
      values.push(id);
    }

    await pool.query(query, values);
    return { status: 200, message: "Talaba ma'lumotlari yangilandi" };
  }

  async deleteStudent(req) {
    const { id } = req.params;
    await pool.query(`UPDATE students SET status = 'inactive' WHERE id = $1`, [
      id,
    ]);
    return { status: 200, message: "Talaba nofaol holatga o'tkazildi" };
  }

  async activateStudent(req) {
    const { id } = req.params;
    await pool.query(`UPDATE students SET status = 'active' WHERE id = $1`, [
      id,
    ]);
    return { status: 200, message: "Talaba faollashtirildi" };
  }
}

export default new StudentService();
