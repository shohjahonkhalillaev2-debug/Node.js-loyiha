import teacherService from "../services/teacher.js";

class TeacherController {
  async createTeacher(req, res) {
    try {
      const resData = await teacherService.createTeacher(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getAllTeachers(req, res) {
    try {
      const resData = await teacherService.getAllTeachers();
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getTeacherById(req, res) {
    try {
      const resData = await teacherService.getTeacherById(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async updateTeacher(req, res) {
    try {
      const resData = await teacherService.updateTeacher(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async deleteTeacher(req, res) {
    try {
      const resData = await teacherService.deleteTeacher(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }
}

export default new TeacherController();