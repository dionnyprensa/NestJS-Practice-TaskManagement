import * as Joi from "@hapi/joi"

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.string().required(),
  APP_HOST: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
});

export enum CONFIG_KEYS {
  APP_PORT = "APP_PORT",
  APP_HOST = "APP_HOST",
  DATABASE_HOST = "DATABASE_HOST",
  DATABASE_PORT = "DATABASE_PORT",
  DATABASE_NAME = "DATABASE_NAME",
  DATABASE_USERNAME = "DATABASE_USERNAME",
  DATABASE_PASSWORD = "DATABASE_PASSWORD",
  JWT_SECRET_KEY = "JWT_SECRET_KEY",
}