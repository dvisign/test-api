const dotenv = require("dotenv");

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATEBASE,
  waitForConnections: true,
  connectionLimit: 10,
  dialect: "mysql",
};
module.exports = { config };
