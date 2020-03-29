import Joi from '@hapi/joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const assetSchema = Joi.object().keys({
  serialNo: Joi.string().required(),
  institutionId: Joi.number().required(),
  assetTypeId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  dateAcquired: Joi.string().required(),
  source: Joi.string().required(),
  donated: Joi.bool().required(),
  warrantyEndDate: Joi.string().required(),
  usageStatus: Joi.string().required(),
  healthStatus: Joi.string().required(),
  repairCost: Joi.number(),
  recyclable: Joi.bool().required(),
  assetImage: Joi.string(),
  assetCreatorId: Joi.number().required(),
});

export const emailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object().keys({
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),

});

export const userSchema = Joi.object().keys({
  roleId: Joi.number().required(),
  firstName: Joi.strict().required().not(''),
  lastName: Joi.strict().required().not(''),
  userName: Joi.string().alphanum().min(3).max(30)
    .required()
    .not(''),
  email: Joi.string().email().not(''),
  password: Joi.string().regex(/[a-zA-Z0-9]/).not(''),
  gender: Joi.strict().required().not(''),
  phoneNo: Joi.strict().required().not(''),
  institutionId: Joi.number().required(),
});
