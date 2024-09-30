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
  BUCKET_NAME: {
    doc: 'The name of the bucket in s3',
    format: '*',
    default: 'cenfi-mmxviii',
    env: 'BUCKET_NAME',
  },
  BUCKET_REGION: {
    doc: 'The region of the bucket in s3',
    format: '*',
    default: 'us-east-1',
    env: 'BUCKET_REGION',
  },
  ACCESS_KEY: {
    doc: 'Access key',
    format: '*',
    default: '',
    sensitive: true,
    env: 'ACCESS_KEY',
  },
  SECRET_ACCESS: {
    doc: 'Secret access',
    format: '*',
    default: '',
    sensitive: true,
    env: 'SECRET_ACCESS',
  },
});

config.validate({allowed: 'strict'});

export { config };
