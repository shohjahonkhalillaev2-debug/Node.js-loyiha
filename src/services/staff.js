import pool from "../config/db.js";
import Joi from "joi";
import argon2 from "argon2";

class StaffService {
  constructor() {}

  async getAllStaff() {
    const staffs = await pool.query("Select * from staff");
    return {
      status: 200,
      data: staffs.rows,
    };
  }
  async createStaff(req) {
    const { fullname, phone, password, role } = req.body;
    let existStaff = await pool.query("select * from staff where phone=$1", [
      phone,
    ]);

    if (existStaff.rows.length) {
      return {
        status: 409,
        message: "USer already exist with this phone number",
      };
    }
    const hashPass = await argon2.hash(password);
    await pool.query(
      `insert into staff(fullname, phone, password, role) values($1,$2,$3,$4)`,
      [fullname, phone, hashPass, role],
    );
    return {
      status: 201,
      message: "User succesfully created",
    };
  }

  async deleteStaff(req){
  const {userId} = req.params
let existStaff = await pool.query("select * from staff where id=$1",[userId]);
  

    if (!existStaff.rows.length) {
      return {
        status: 404,
        message: "User with this id not found"
      }; 
    }
    await pool.query("Update staff set status='inactive' where id=$1",[userId]);
     return {
      status: 200,
      message: "User deleted"
     }
  }

}

let staffService = new StaffService();

export default staffService;
