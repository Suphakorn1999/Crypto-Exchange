const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Currency = require("./Currency");

const FiatWallet = sequelize.define(
  "FiatWallet",
  {
    wallet_id: {
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
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "fiat_wallet",
    timestamps: true,
  }
);

FiatWallet.belongsTo(User, { foreignKey: "user_id" });
FiatWallet.belongsTo(Currency, { foreignKey: "currency_id" });

User.hasMany(FiatWallet, { foreignKey: "user_id" });
Currency.hasMany(FiatWallet, { foreignKey: "currency_id" });

module.exports = FiatWallet;
