const knex = require("knex");
const config = require("./knexfile");
const dbEnv = process.env.NODE_ENV || "development";
const db = knex(config[dbEnv]);

module.exports = db;
