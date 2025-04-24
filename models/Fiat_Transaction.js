const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Currency = require("./Currency");

const FiatTransaction = sequelize.define(
  "FiatTransaction",
  {
    fiat_transaction_id: {
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
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "currency",
        key: "currency_id",
      },
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER, //1 = Deposit,2=Withdraw,3=Payment
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]]
      }
    },
    status: {
      type: DataTypes.INTEGER, //1 = Pending,2 = Completed,3 = Cancelled
      defaultValue: 1,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]]
      }
    },
  },
  {
    tableName: "fiat_transaction",
    timestamps: true,
  }
);

FiatTransaction.belongsTo(User, { foreignKey: "user_id" });
FiatTransaction.belongsTo(Currency, { foreignKey: "currency_id" });

User.hasMany(FiatTransaction, { foreignKey: "user_id" });
Currency.hasMany(FiatTransaction, { foreignKey: "currency_id" });

module.exports = FiatTransaction;