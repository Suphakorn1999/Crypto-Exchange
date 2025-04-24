const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Coin = sequelize.define(
  "Coin",
  {
    coin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    coin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "coin",
    timestamps: true,
  }
);

module.exports = Coin;
