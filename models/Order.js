const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Coin = require("./Coin");

const Orders = sequelize.define(
  "Orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    order_type: {
      type: DataTypes.INTEGER, //1 = Buy,2 = Sell
      allowNull: false,
      enum: [1, 2],
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "coin",
        key: "coin_id",
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER, //1 = Open,2 = Completed,3 = Cancelled
      allowNull: false,
      enum: [1, 2, 3],
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Orders.belongsTo(User, { foreignKey: "user_id" });
Orders.belongsTo(Coin, { foreignKey: "coin_id" });

User.hasMany(Orders, { foreignKey: "user_id" });
Coin.hasMany(Orders, { foreignKey: "coin_id" });

module.exports = Orders;
