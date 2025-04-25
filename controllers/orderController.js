const Orders = require("../models/Order");
const FiatWallet = require("../models/Fiat_Wallet");
const CryptoWallet = require("../models/Crypto_Wallet");
const Coin = require("../models/Coin");

exports.createOrder = async (req, res) => {
  try {
    const { user_id, order_type, coin_id, price, amount, currency_id, status } = req.body;

    if (!user_id || !order_type || !coin_id || !price || !amount || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const coin = await Coin.findByPk(coin_id);
    if (!coin) {
      return res.status(404).json({ message: "Coin not found" });
    }

    if (order_type === 1) {
      const fiatWallet = await FiatWallet.findOne({
        where: { user_id: user_id, currency_id: currency_id },
      });

      if (!fiatWallet || fiatWallet.balance < price * amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
    }

    if (order_type === 2) {
      const cryptoWallet = await CryptoWallet.findOne({
        where: { user_id, coin_id },
      });

      if (!cryptoWallet || cryptoWallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient coin balance" });
      }
    }

    const newOrder = await Orders.create({
      user_id,
      order_type,
      coin_id,
      price,
      amount,
      currency_id,
      status,
    });

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};