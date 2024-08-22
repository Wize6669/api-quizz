import Joi from 'joi';

const questionSchema = Joi.object({
  text: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.base': 'El texto de la pregunta debe ser una cadena de texto.',
      'string.empty': 'El texto de la pregunta no puede estar vacío.',
      'string.min': 'El texto de la pregunta debe tener al menos 1 carácter.',
      'string.max': 'El texto de la pregunta no puede tener más de 255 caracteres.',
      'any.required': 'El texto de la pregunta es obligatorio.',
    }),

  imageUrl: Joi.string()
    .uri()
    .allow(null)
    .optional()
    .messages({
      'string.base': 'La URL de la imagen debe ser una cadena de texto.',
      'string.uri': 'La URL de la imagen debe ser una URI válida.',
    }),

  justification: Joi.string()
    .allow(null)
    .optional()
    .messages({
      'string.base': 'La justificación debe ser una cadena de texto.',
    }),

  answer: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'La respuesta debe ser un número entero.',
      'number.integer': 'La respuesta debe ser un número entero.',
      'number.min': 'La respuesta debe ser mayor o igual a 0.',
      'any.required': 'La respuesta es obligatoria.',
    }),

  categoryId: Joi.number()
    .integer()
    .allow(null)
    .optional()
    .messages({
      'number.base': 'El ID de la categoría debe ser un número entero.',
      'number.integer': 'El ID de la categoría debe ser un número entero.',
    }),

  simulatorId: Joi.string()
    .allow(null)
    .optional()
    .messages({
      'string.base': 'El ID del simulador debe ser una cadena de texto.',
      'string.empty': 'El ID del simulador no puede estar vacío.',
    }),
})

const questionSchemaParams = Joi.object({
  id: Joi.number().integer().min(1).required()
});


export { questionSchema, questionSchemaParams };
