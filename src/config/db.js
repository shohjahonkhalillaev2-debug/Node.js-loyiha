import { Pool } from "pg";
import { configDotenv } from "dotenv";
configDotenv();

const pool = new Pool({
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
  user: process.env.PG_NAME,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
});

pool.on("connect", () => {
  console.log("PostgreSQL bazasiga muvaffaqiyatli ulandi");
});

pool.on("error", (err) => {
  console.error("Kutilmagan baza xatosi:", err.message);
});

export default pool;
