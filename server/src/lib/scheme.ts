import Joi from "@hapi/joi"

/**
 * 用户预约提交信息校验
 */

export const bookInfoSchema = Joi.object({
  name: Joi.string().required(),
  mobileNumber: Joi.string().pattern(/^1[3-9]\d{9}$/).required(),
  company: Joi.string().required(),
  position: Joi.string().required(),
  miniProgramName: Joi.string().allow(''),
  introduce: Joi.string().allow(''),
  haveMiniProgram: Joi.boolean().required(),
  concernInformation: Joi.string().required(),
  liveId: Joi.string().required(),
  userId: Joi.string().required()
});