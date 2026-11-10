import staffService from "../services/staff.js";

class Staffcontroller {
  constructor() {}
  async getAllstaff(req, res){
    let resData = await staffService.getAllStaff()
    return res.status(resData.status).json(resData);
  }

  async createStaff(req, res) {
    let resData = await staffService.createStaff(req);
    return res.status(resData.status).json(resData);
  }

  async deleteStaff(req,res){
    let resData = await staffService.deleteStaff(req)
    return res.status(resData.status).json(resData);
  }
}

const staffController = new Staffcontroller();
export default staffController;
