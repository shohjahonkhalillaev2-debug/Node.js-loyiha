import courseService from "../services/course.js";

class CourseController {
  async createCourse(req, res) {
    const resData = await courseService.createCourse(req);
    return res.status(resData.status).json(resData);
  }
  async getAllCourses(req, res) {
    const resData = await courseService.getAllCourses();
    return res.status(resData.status).json(resData);
  }
  async getCourseById(req, res) {
    const resData = await courseService.getCourseById(req);
    return res.status(resData.status).json(resData);
  }
  async updateCourse(req, res) {
    const resData = await courseService.updateCourse(req);
    return res.status(resData.status).json(resData);
  }
  async deleteCourse(req, res) {
    const resData = await courseService.deleteCourse(req);
    return res.status(resData.status).json(resData);
  }
}

export default new CourseController();