import pool from "../config/db.js";

class DashboardService {
  async getDashboardData() {
    const studentsCount = await pool.query(
      `SELECT COUNT(*) FROM students WHERE status = 'active'`,
    );
    const teachersCount = await pool.query(
      `SELECT COUNT(*) FROM teachers WHERE status = 'active'`,
    );
    const groupsCount = await pool.query(
      `SELECT COUNT(*) FROM groups WHERE status = 'active'`,
    );
    const staffCount = await pool.query(
      `SELECT COUNT(*) FROM staff WHERE status = 'active'`,
    );

    return {
      status: 200,
      data: {
        totalStudents: parseInt(studentsCount.rows[0].count),
        totalTeachers: parseInt(teachersCount.rows[0].count),
        totalGroups: parseInt(groupsCount.rows[0].count),
        totalStaff: parseInt(staffCount.rows[0].count),
      },
    };
  }
}

export default new DashboardService();
