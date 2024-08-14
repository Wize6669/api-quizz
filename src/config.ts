import convict from 'convict'
import 'dotenv/config'
import convict_format_with_validator from 'convict-format-with-validator'

require('dotenv').config()

convict.addFormats(convict_format_with_validator);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  HOST_FRONT_END: {
    doc: 'Front end host name/IP',
    format: '*',
    default: 'http://localhost:3000',
    env: 'HOST_FRONT_END',
  },
  PUBLIC_SECRET_KEY: {
    doc: 'Secret used for JWT',
    format: '*',
    default: '',
    sensitive: true,
    env: 'PUBLIC_SECRET_KEY',
  },
});

//config.validate();

config.validate({allowed: 'strict'});

export { config };
