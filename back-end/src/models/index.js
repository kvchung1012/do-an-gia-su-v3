const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("doangiasu", "root", null, {
  port: 3306,
  host: "localhost",
  password: null,
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  define: {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize;
