import pool from "../config/db.js";

class BranchService {
  async createBranch(req) {
    const { name, address, call_number } = req.body;
    await pool.query(
      `INSERT INTO branches (name, address, call_number) VALUES ($1, $2, $3)`,
      [name, address, call_number]
    );
    return { status: 201, message: "Filial muvaffaqiyatli yaratildi" };
  }

  async getAllBranches() {
    const result = await pool.query(`SELECT * FROM branches ORDER BY id ASC`);
    return { status: 200, data: result.rows };
  }

  async getBranchById(req) {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM branches WHERE id = $1`, [id]);
    if (!result.rows.length) return { status: 404, message: "Filial topilmadi" };
    return { status: 200, data: result.rows[0] };
  }

  async updateBranch(req) {
    const { id } = req.params;
    const { name, address, call_number } = req.body;
    await pool.query(
      `UPDATE branches SET name = COALESCE($1, name), address = COALESCE($2, address), call_number = COALESCE($3, call_number) WHERE id = $4`,
      [name, address, call_number, id]
    );
    return { status: 200, message: "Filial yangilandi" };
  }

  async deleteBranch(req) {
    const { id } = req.params;
    await pool.query(`DELETE FROM branches WHERE id = $1`, [id]);
    return { status: 200, message: "Filial o'chirildi" };
  }
}

export default new BranchService();