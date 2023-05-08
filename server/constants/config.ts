const { config } = require('dotenv');
config();

module.exports =  {
    PORT : process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    PASSECRET: process.env.PASSECRET,
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    port: process.env.port,
    password: process.env.password
};