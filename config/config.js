require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = {
  production: {
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    operatorsAliases: {
      $like: Sequelize.Op.like
    }
  },
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    operatorsAliases: {
      $like: Sequelize.Op.like
    }
  },
  test: {
    username: "root",
    password: process.env.MYSQL_PASS,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
};
