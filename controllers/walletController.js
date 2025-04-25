const Transaction = require("../models/Transaction");
const FiatWallet = require("../models/Fiat_Wallet");
const CryptoWallet = require("../models/Crypto_Wallet");
const Coin = require("../models/Coin");
const FiatTransaction = require("../models/Fiat_Transaction");
const Currency = require("../models/Currency");
const User = require("../models/User");

exports.createTransaction = async (req, res) => {
  try {
    const { from_user_id, to_user_id, coin_id, amount, type, status } = req.body;

    if (!from_user_id || !to_user_id || !coin_id || !amount || !type || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const coin = await Coin.findByPk(coin_id);
    if (!coin) {
      return res.status(404).json({ message: "Coin not found" });
    }

    if (type === 1 || type === 3) {
      const cryptoWallet = await CryptoWallet.findOne({
        where: { user_id: from_user_id, coin_id },
      });

      if (!cryptoWallet || cryptoWallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance in Crypto wallet" });
      }

      cryptoWallet.balance -= amount;
      await cryptoWallet.save();


      let recipientWallet = await CryptoWallet.findOne({
        where: { user_id: to_user_id, coin_id },
      });

      if (!recipientWallet) {
        recipientWallet = await CryptoWallet.create({
          user_id: to_user_id,
          coin_id,
          balance: amount,
        });
      } else {
        recipientWallet.balance += amount;
        await recipientWallet.save();
      }

      const newTransaction = await Transaction.create({
        from_user_id,
        to_user_id,
        coin_id,
        amount,
        type,
        status,
      });

      return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: newTransaction,
      });
    }

    if (type === 2) {
      const fiatWallet = await FiatWallet.findOne({
        where: { user_id: from_user_id },
      });

      if (!fiatWallet || fiatWallet.balance < amount * coin.price) {
        return res.status(400).json({ message: "Insufficient funds in Fiat wallet" });
      }

      fiatWallet.balance -= amount * coin.price;
      await fiatWallet.save();

      const newTransaction = await Transaction.create({
        from_user_id,
        to_user_id,
        coin_id,
        amount,
        type,
        status,
      });

      return res.status(201).json({
        message: "External transfer transaction completed successfully",
        transaction: newTransaction,
      });
    }

    return res.status(400).json({ message: "Invalid transaction type" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createFiatTransaction = async (req, res) => {
  try {
    const { user_id, currency_id, amount, type, status } = req.body;

    if (!user_id || !currency_id || !amount || !type || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currency = await Currency.findByPk(currency_id);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }


    if (type === 1) {
      const fiatWallet = await FiatWallet.findOne({ where: { user_id } });

      if (!fiatWallet) {
        return res.status(404).json({ message: "Fiat wallet not found" });
      }

      fiatWallet.balance += amount;
      await fiatWallet.save();
    }
    else if (type === 2) {
      const fiatWallet = await FiatWallet.findOne({ where: { user_id } });

      if (!fiatWallet || fiatWallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance in Fiat wallet" });
      }
      fiatWallet.balance -= amount;
      await fiatWallet.save();
    }
    else if (type === 3) {
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    const newFiatTransaction = await FiatTransaction.create({
      user_id,
      currency_id,
      amount,
      type,
      status,
    });

    return res.status(201).json({
      message: "Fiat transaction created successfully",
      fiatTransaction: newFiatTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.CreateCyptoWallet = async (req, res) => {
  try {
    const { user_id, coin_id, amount } = req.body;

    if (!user_id || !coin_id || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const coin = await Coin.findByPk(coin_id);
    if (!coin) {
      return res.status(404).json({ message: "Coin not found" });
    }

    const cryptoWallet = await CryptoWallet.create({
      user_id,
      coin_id,
      balance: amount,
    });

    return res.status(201).json({
      message: "Crypto wallet created successfully",
      cryptoWallet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

exports.CreateFiatWallet = async (req, res) => {
  try {
    const { user_id, currency_id, amount } = req.body;

    if (!user_id || !currency_id || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currency = await Currency.findByPk(currency_id);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }

    const fiatWallet = await FiatWallet.create({
      user_id,
      currency_id,
      balance: amount,
    });

    return res.status(201).json({
      message: "Fiat wallet created successfully",
      fiatWallet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
