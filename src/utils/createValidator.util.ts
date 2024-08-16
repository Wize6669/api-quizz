import { Schema } from 'joi';

const createValidator = (schema: Schema) =>
  (payload: any) => {
    return schema.validate(payload, {
      // shows all error messages instead of the first error message
      abortEarly: false
    });
  }

  export { createValidator };
