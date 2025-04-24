const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Currency = sequelize.define(
  "Currency",
  {
    currency_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    currency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "currency",
    timestamps: true,
  }
);

module.exports = Currency;
