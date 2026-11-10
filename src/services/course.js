import pool from "../config/db.js";

class CourseService {
  async createCourse(req) {
    const { name, price, duration, description } = req.body;
    await pool.query(
      `INSERT INTO courses (name, price, duration, description) VALUES ($1, $2, $3, $4)`,
      [name, price, duration, description]
    );
    return { status: 201, message: "Kurs yaratildi" };
  }

  async getAllCourses() {
    const result = await pool.query(`SELECT * FROM courses ORDER BY id ASC`);
    return { status: 200, data: result.rows };
  }

  async getCourseById(req) {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM courses WHERE id = $1`, [id]);
    if (!result.rows.length) return { status: 404, message: "Kurs topilmadi" };
    return { status: 200, data: result.rows[0] };
  }

  async updateCourse(req) {
    const { id } = req.params;
    const { name, price, duration, description } = req.body;
    await pool.query(
      `UPDATE courses SET name = COALESCE($1, name), price = COALESCE($2, price), duration = COALESCE($3, duration), description = COALESCE($4, description) WHERE id = $5`,
      [name, price, duration, description, id]
    );
    return { status: 200, message: "Kurs yangilandi" };
  }

  async deleteCourse(req) {
    const { id } = req.params;
    await pool.query(`DELETE FROM courses WHERE id = $1`, [id]);
    return { status: 200, message: "Kurs o'chirildi" };
  }
}

export default new CourseService();