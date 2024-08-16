import Joi from 'joi';

const userSchemaSingUp = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  roleId: Joi.number().required(),
});

export { userSchemaSingUp };
