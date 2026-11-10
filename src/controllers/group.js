import groupService from "../services/group.js";

class GroupController {
  async createGroup(req, res) {
    const resData = await groupService.createGroup(req);
    return res.status(resData.status).json(resData);
  }
  async getAllGroups(req, res) {
    const resData = await groupService.getAllGroups();
    return res.status(resData.status).json(resData);
  }
  async addStudentToGroup(req, res) {
    const resData = await groupService.addStudentToGroup(req);
    return res.status(resData.status).json(resData);
  }
}

export default new GroupController();