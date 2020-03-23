import { UserInputError } from 'apollo-server';
import Joi from '@hapi/joi';

export const generalValidator = <T>(data: T, schema: Joi.SchemaLike): T => {
  const { error, value } = Joi.validate(data, schema);
  if (error) throw new UserInputError(error.details[0].message.replace(/\\|(")/g, ''));
  return value;
};
