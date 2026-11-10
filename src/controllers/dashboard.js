import dashboardService from "../services/dashboard.js";

class DashboardController {
  async getDashboardData(req, res) {
    try {
      const resData = await dashboardService.getDashboardData();
      return res.status(resData.status).json(resData);
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default new DashboardController();