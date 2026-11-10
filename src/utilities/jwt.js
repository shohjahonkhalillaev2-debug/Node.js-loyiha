import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_lms_key_2026";

export default {
  sign: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }),
  verify: (token) => jwt.verify(token, JWT_SECRET),
};
