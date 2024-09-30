import Joi from 'joi';

const simulatorSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede tener más de 100 caracteres.',
      'any.required': 'El nombre es obligatorio.',
    }),

  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    )
    .required()
    .messages({
      'string.pattern.base':
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.',
      'string.empty': 'La contraseña no puede estar vacía.',
      'any.required': 'La contraseña es obligatoria.',
    }),

  duration: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'La duración debe ser un número entero.',
      'number.positive': 'La duración debe ser un número positivo.',
      'any.required': 'La duración es obligatoria.',
    }),

  navigate: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El valor de navegación debe ser un booleano.',
      'any.required': 'El campo de navegación es obligatorio.',
    }),

  visibility: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El valor de visibilidad debe ser un booleano.',
      'any.required': 'El campo de visibilidad es obligatorio.',
    }),


  number_of_questions: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'El número de preguntas debe ser un número entero.',
      'number.min': 'El número de preguntas no puede ser negativo.',
    }),

  number_of_sections: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'El número de secciones debe ser un número entero.',
      'number.min': 'El número de secciones no puede ser negativo.',
    }),
});

const simulatorSchemaParams = Joi.object({
  id: Joi.string().min(3).required(),
});

const updateSimulatorSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
    .optional(),
  duration: Joi.number().integer().min(1).optional(),
  navigate: Joi.boolean().optional(),
  number_of_questions: Joi.number().integer().min(0).optional(),
}).min(1);

export { simulatorSchema, simulatorSchemaParams, updateSimulatorSchema };
