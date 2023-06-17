const Joi = require("joi");
exports.userloginmodel = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
