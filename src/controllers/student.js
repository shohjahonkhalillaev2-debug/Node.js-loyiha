import studentService from "../services/student.js";

class StudentController {
  async createStudent(req, res) {
    try {
      const resData = await studentService.createStudent(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getAllStudents(req, res) {
    try {
      const resData = await studentService.getAllStudents();
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async getStudentById(req, res) {
    try {
      const resData = await studentService.getStudentById(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async updateStudent(req, res) {
    try {
      const resData = await studentService.updateStudent(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async deleteStudent(req, res) {
    try {
      const resData = await studentService.deleteStudent(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  async activateStudent(req, res) {
    try {
      const resData = await studentService.activateStudent(req);
      return res.status(resData.status).json(resData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }
}

export default new StudentController();