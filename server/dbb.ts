const { Pool } = require('pg');
const {user, host, port, database, password} = require('./constants/config')

export const client = new Pool({
    user: user,
    host: host,
    password: password,
    port: port,
    database: database
});

client.connect();

// module.exports = client


