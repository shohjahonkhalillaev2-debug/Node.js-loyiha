import pool from "../config/db.js";

class LMSOperationsService {
  async createLesson(req) {
    const { title, group_id, lesson_date, description } = req.body;
    await pool.query(
      `INSERT INTO lessons (title, group_id, lesson_date, description) VALUES ($1, $2, $3, $4)`,
      [title, group_id, lesson_date, description],
    );
    return { status: 201, message: "Dars jadvalga qo'shildi" };
  }

  async getLessonsByGroup(req) {
    const { groupId } = req.params;
    const result = await pool.query(
      `SELECT * FROM lessons WHERE group_id = $1 ORDER BY lesson_date ASC`,
      [groupId],
    );
    return { status: 200, data: result.rows };
  }

  async recordAttendance(req) {
    const { lesson_id, student_id, status, comment } = req.body;
    await pool.query(
      `INSERT INTO attendance (lesson_id, student_id, status, comment) VALUES ($1, $2, $3, $4)`,
      [lesson_id, student_id, status, comment],
    );
    return { status: 200, message: "Davomat belgilandi" };
  }

  async getAttendanceByLesson(req) {
    const { lessonId } = req.params;
    const result = await pool.query(
      `SELECT a.*, s.fullname as student_name FROM attendance a
       JOIN students s ON a.student_id = s.id
       WHERE a.lesson_id = $1`,
      [lessonId],
    );
    return { status: 200, data: result.rows };
  }

  async makePayment(req) {
    const { student_id, group_id, amount, payment_type } = req.body;
    await pool.query(
      `INSERT INTO payments (student_id, group_id, amount, payment_type) VALUES ($1, $2, $3, $4)`,
      [student_id, group_id, amount, payment_type],
    );
    return { status: 201, message: "To'lov muvaffaqiyatli qabul qilindi" };
  }

  async getStudentPayments(req) {
    const { studentId } = req.params;
    const result = await pool.query(
      `SELECT * FROM payments WHERE student_id = $1 ORDER BY paid_at DESC`,
      [studentId],
    );
    return { status: 200, data: result.rows };
  }

  async addTest(req) {
    const { lesson_id, question, options, correct_answer } = req.body;
    await pool.query(
      `INSERT INTO tests (lesson_id, question, options, correct_answer) VALUES ($1, $2, $3, $4)`,
      [lesson_id, question, JSON.stringify(options), correct_answer],
    );
    return { status: 201, message: "Test savoli yaratildi" };
  }

  async getTestsByLesson(req) {
    const { lessonId } = req.params;
    const result = await pool.query(
      `SELECT id, lesson_id, question, options FROM tests WHERE lesson_id = $1`,
      [lessonId],
    );
    return { status: 200, data: result.rows };
  }
}

export default new LMSOperationsService();
