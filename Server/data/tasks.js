const knex = require("knex");
const dotenv = require("dotenv");

const db = knex({
    client: "pg",
    connecttion: {
        host: process.env.DB_HOST,
        port : process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
})

module.exports = {
    db
}
