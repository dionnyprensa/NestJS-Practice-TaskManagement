import * as Joi from "@hapi/joi"

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.string().required(),
  APP_HOST: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
});