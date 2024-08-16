import Joi from 'joi';

const headerAuthorizationSchemaJWT = Joi.object({
    authorization: Joi.string()
    .pattern(new RegExp('^Bearer\\s+([A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*)$'))
    .required()
}).unknown(true);

export { headerAuthorizationSchemaJWT };

