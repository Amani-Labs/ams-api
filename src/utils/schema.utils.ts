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