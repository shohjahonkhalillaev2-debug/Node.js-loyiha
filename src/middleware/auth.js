import jwtUtil from "../utilities/jwt.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        status: 401,
        message: "Avtorizatsiyadan o'tilmagan (Token topilmadi)",
      });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwtUtil.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "Yaroqsiz yoki muddati o'tgan token" });
  }
};

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: 403, message: "Ruxsat etilmagan amal" });
    }
    next();
  };
};
