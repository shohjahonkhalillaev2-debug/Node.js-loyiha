import schema from "../utilities/validation.js";

export default {
  staffCreate: (req, res, next) => {
    schema.staffscheme.validate(req.body);
    const { error } = schema.staffscheme.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    return next();
  },
};
