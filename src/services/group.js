import pool from "../config/db.js";

class GroupService {
  async createGroup(req) {
    const { name, course_id, teacher_id, branch_id, lesson_time, days } = req.body;
    await pool.query(
      `INSERT INTO groups (name, course_id, teacher_id, branch_id, lesson_time, days) VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, course_id, teacher_id, branch_id, lesson_time, days]
    );
    return { status: 201, message: "Guruh muvaffaqiyatli ochildi" };
  }

  async getAllGroups() {
    const result = await pool.query(
      `SELECT g.id, g.name, g.lesson_time, g.days, g.status,
              c.name as course_name, t.fullname as teacher_name, b.name as branch_name 
       FROM groups g
       LEFT JOIN courses c ON g.course_id = c.id
       LEFT JOIN teachers t ON g.teacher_id = t.id
       LEFT JOIN branches b ON g.branch_id = b.id
       ORDER BY g.id ASC`
    );
    return { status: 200, data: result.rows };
  }

  async addStudentToGroup(req) {
    const { group_id, student_id } = req.body;
    await pool.query(
      `INSERT INTO group_students (group_id, student_id) VALUES ($1, $2)`,
      [group_id, student_id]
    );
    return { status: 200, message: "Talaba guruhga qo'shildi" };
  }
}

export default new GroupService();