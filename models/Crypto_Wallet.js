const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Coin = require("./Coin");

const CryptoWallet = sequelize.define(
  "CryptoWallet",
  {
    crypto_id: {
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
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
            model: "coin",
            key: "coin_id",
        },
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "crypto_wallet",
    timestamps: true,
  }
);

CryptoWallet.belongsTo(User, { foreignKey: "user_id" });
CryptoWallet.belongsTo(Coin, { foreignKey: "coin_id" });

User.hasMany(CryptoWallet, { foreignKey: "user_id" });
Coin.hasMany(CryptoWallet, { foreignKey: "coin_id" });

module.exports = CryptoWallet;
