import convict from 'convict'
import convict_format_with_validator from 'convict-format-with-validator'

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
});

config.validate();

export { config };
