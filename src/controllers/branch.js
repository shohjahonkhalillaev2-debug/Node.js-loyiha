import branchService from "../services/branch.js";

class BranchController {
  async createBranch(req, res) {
    try {
      const resData = await branchService.createBranch(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getAllBranches(req, res) {
    try {
      const resData = await branchService.getAllBranches();
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getBranchById(req, res) {
    try {
      const resData = await branchService.getBranchById(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async updateBranch(req, res) {
    try {
      const resData = await branchService.updateBranch(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async deleteBranch(req, res) {
    try {
      const resData = await branchService.deleteBranch(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }
}

export default new BranchController();