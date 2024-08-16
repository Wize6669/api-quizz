import Joi from 'joi';

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1),
    count: Joi.number().integer().min(1),
});

export { paginationSchema };