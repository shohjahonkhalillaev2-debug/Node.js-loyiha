import opsService from "../services/lms.js";

class LMSOperationsController {
  async createLesson(req, res) {
    const resData = await opsService.createLesson(req);
    return res.status(resData.status).json(resData);
  }
  async getMyLessons(req, res) {
    const resData = await opsService.getMyLessons(req);
    return res.status(resData.status).json(resData);
  }
  async getLessonsByGroup(req, res) {
    const resData = await opsService.getLessonsByGroup(req);
    return res.status(resData.status).json(resData);
  }
  async recordAttendance(req, res) {
    const resData = await opsService.recordAttendance(req);
    return res.status(resData.status).json(resData);
  }
  async getAttendanceByLesson(req, res) {
    const resData = await opsService.getAttendanceByLesson(req);
    return res.status(resData.status).json(resData);
  }
  async makePayment(req, res) {
    const resData = await opsService.makePayment(req);
    return res.status(resData.status).json(resData);
  }
  async getStudentPayments(req, res) {
    const resData = await opsService.getStudentPayments(req);
    return res.status(resData.status).json(resData);
  }
  async addTest(req, res) {
    const resData = await opsService.addTest(req);
    return res.status(resData.status).json(resData);
  }
  async getTestsByLesson(req, res) {
    const resData = await opsService.getTestsByLesson(req);
    return res.status(resData.status).json(resData);
  }
}

export default new LMSOperationsController();