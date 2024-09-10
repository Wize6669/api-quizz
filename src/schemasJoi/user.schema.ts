import Joi from 'joi';

const userSchemaSingUp = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]{3,30}$')).required(),
  roleId: Joi.number().required(),
});

const userSchemaUpdateBody = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  roleId: Joi.number().required(),
});

const userSchemaChangePasswordBody = Joi.object({
  temporaryPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]{3,30}$')).required(),
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]{3,30}$')).required(),
});

const userSchemaParams = Joi.object({
  id: Joi.string().min(3).required(),
});

export { userSchemaSingUp, userSchemaUpdateBody, userSchemaParams, userSchemaChangePasswordBody };
