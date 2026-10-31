import pool from "../config/db.js";

const getAllUSers = async () => {
  const users = await pool.query("Select * from users");
  console.log(users);
};

export default {
  getAllUSers,
};

