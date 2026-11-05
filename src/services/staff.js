import pool from "../config/db.js";

class StaffService {
  constructor() {}

  async createStaff(req) {
    const { fullname, phone, password, role } = req.body;

    await pool.query(`insert into staff(fullname, phone, password, role) values($1,$2,$3,$4)`[fullname,phone,password,role]);
    return{
        status:201,
        message:"User succesfully created"
    }
  }
}

let staffService = new StaffService();

export default staffService;
