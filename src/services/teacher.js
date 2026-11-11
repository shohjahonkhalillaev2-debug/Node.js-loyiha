import pool from "../config/db.js";
import argon2 from "argon2";

class TeacherService {

  async getMyLessons(req) {
  const teacherId = req.user.id;

  const result = await pool.query(
    `SELECT l.*, g.name AS group_name
     FROM lessons l
     LEFT JOIN groups g ON l.group_id = g.id
     WHERE l.teacher_id = $1
     ORDER BY l.id DESC`,
    [teacherId]
  );}
  
  async createTeacher(req) {
    const { fullname, phone, password, branch_id } = req.body;
    const hashPassword = await argon2.hash(password);

    await pool.query(
      `INSERT INTO teachers (fullname, phone, password, branch_id, status) VALUES ($1, $2, $3, $4, 'active')`,
      [fullname, phone, hashPassword, branch_id]
    );

    return { status: 201, message: "O'qituvchi muvaffaqiyatli yaratildi" };
  }

  async getAllTeachers() {
    const result = await pool.query(
      `SELECT t.id, t.fullname, t.phone, t.status, b.name as branch_name 
       FROM teachers t 
       LEFT JOIN branches b ON t.branch_id = b.id 
       ORDER BY t.id ASC`
    );
    return { status: 200, data: result.rows };
  }

  async getTeacherById(req) {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT t.id, t.fullname, t.phone, t.status, t.branch_id, b.name as branch_name 
       FROM teachers t 
       LEFT JOIN branches b ON t.branch_id = b.id 
       WHERE t.id = $1`,
      [id]
    );
    if (!result.rows.length) return { status: 404, message: "O'qituvchi topilmadi" };
    return { status: 200, data: result.rows[0] };
  }

  async updateTeacher(req) {
    const { id } = req.params;
    const { fullname, phone, branch_id } = req.body;
    await pool.query(
      `UPDATE teachers SET fullname = COALESCE($1, fullname), phone = COALESCE($2, phone), branch_id = COALESCE($3, branch_id) WHERE id = $4`,
      [fullname, phone, branch_id, id]
    );
    return { status: 200, message: "O'qituvchi yangilandi" };
  }

  async deleteTeacher(req) {
    const { id } = req.params;
    await pool.query(`UPDATE teachers SET status = 'inactive' WHERE id = $1`, [id]);
    return { status: 200, message: "O'qituvchi nofaol qilindi" };
  }
}

export default new TeacherService();