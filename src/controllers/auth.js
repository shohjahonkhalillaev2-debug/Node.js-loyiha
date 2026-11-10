import authService from "../services/auth.js";

class AuthController {
  async login(req, res) {
    try {
      const resData = await authService.login(req);
      return res.status(resData.status).json(resData);
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default new AuthController();
