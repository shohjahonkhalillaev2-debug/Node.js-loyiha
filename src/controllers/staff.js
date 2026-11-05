import staffService from "../services/staff.js";

class Staffcontroller {
  constructor() {}

  async createStaff(req, res) {
    let resData = staffService.createStaff(req);
    return res.status(resData.status).json(resData);
  }
}

const staffController = new Staffcontroller();
export default staffController;
