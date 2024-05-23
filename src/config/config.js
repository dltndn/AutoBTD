const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

dotenv.config({path: path.join(__dirname, '../../.env')});

const envVarSchema = joi.object()
    .keys({
        NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
        PORT: joi.number().default(12050),

        // serverIp 관련
        BITHUMB_API: joi.string().required(),

        // api key 관련
        BITHUMB_API_KEY: joi.string().required(),
        BITHUMB_SECRET_KEY: joi.string().required(),

        // sql 관련
        // SQL_HOST: joi.string().required(),
        // SQL_PORT: joi.number().required(),
        // SQL_DATABASE: joi.string().required(),
        // SQL_USERNAME: joi.string().required(),
        // SQL_PASSWORD: joi.string().required(),
        // SQL_DIALECT: joi.string().required().valid('mysql', 'postgres', 'mssql', 'mariadb'),
    })
    .unknown();

const {value: envVars, error} = envVarSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,

    // serverIp 관련
    bithumbApi: envVars.BITHUMB_API,

    // api key 관련
    bithumbApiKey: envVars.BITHUMB_API_KEY,
    bithumbSecretKey: envVars.BITHUMB_SECRET_KEY,

    // sql 관련
    // sequelize: {
    //     database: envVars.SQL_DATABASE + (envVars.NODE_ENV === 'development' || envVars.NODE_ENV === 'test' ? '_dev' : ''),
    //     username: envVars.SQL_USERNAME,
    //     password: envVars.SQL_PASSWORD,
    //     host: envVars.SQL_HOST,
    //     port: envVars.SQL_PORT,
    //     dialect: envVars.SQL_DIALECT,
    // },
};