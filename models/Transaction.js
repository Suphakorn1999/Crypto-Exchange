const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Coin = require("./Coin");

const Transaction = sequelize.define(
  "Transaction",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "coin",
        key: "coin_id",
      },
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER, //1 = Transfer,2 = ExternalTransfer,3 = Exchange
      allowNull: false,
      enum: [1, 2, 3],
    },
    status: {
      type: DataTypes.INTEGER, //1 = Pending,2 = Completed,3 = Failed
      allowNull: false,
      enum: [1, 2, 3],
    },
  },
  {
    tableName: "transaction",
    timestamps: true,
  }
);

Transaction.belongsTo(User, { foreignKey: "from_user_id" });
Transaction.belongsTo(User, { foreignKey: "to_user_id" });
Transaction.belongsTo(Coin, { foreignKey: "coin_id" });

User.hasMany(Transaction, { foreignKey: "from_user_id" });
User.hasMany(Transaction, { foreignKey: "to_user_id" });
Coin.hasMany(Transaction, { foreignKey: "coin_id" });


module.exports = Transaction;
