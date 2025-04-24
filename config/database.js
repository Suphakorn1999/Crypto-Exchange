const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.HOST_DB || "mysql",
  username: process.env.USER_DB || "user",
  password: process.env.PASSWORD_DB || "password",
  database: process.env.NAME_DB || "crypto_exchange",
  logging: console.log,
  sync: { force: false, alter: true },
});

module.exports = sequelize;
