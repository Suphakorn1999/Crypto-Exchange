const FiatWallet = require("../models/Fiat_Wallet");
const CryptoWallet = require("../models/Crypto_Wallet");
const FiatTransaction = require("../models/Fiat_Transaction");
const Transaction = require("../models/Transaction");

exports.createFiatWallet = async (req, res) => {
  try {
    const { user_id, balance } = req.body;

    if (!user_id || !balance) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFiatWallet = await FiatWallet.create({
      user_id,
      balance,
    });

    return res
      .status(201)
      .json({
        message: "Fiat wallet created successfully",
        fiatWallet: newFiatWallet,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCryptoWallet = async (req, res) => {
  try {
    const { user_id, coin_id, balance } = req.body;

    if (!user_id || !coin_id || !balance) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCryptoWallet = await CryptoWallet.create({
      user_id,
      coin_id,
      balance,
    });

    return res
      .status(201)
      .json({
        message: "Crypto wallet created successfully",
        cryptoWallet: newCryptoWallet,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createFiatTransaction = async (req, res) => {
    try {
        const { user_id, amount, transaction_type } = req.body;
    
        if (!user_id || !amount || !transaction_type) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const newFiatTransaction = await FiatTransaction.create({
        user_id,
        amount,
        transaction_type,
        });
    
        return res
        .status(201)
        .json({
            message: "Fiat transaction created successfully",
            fiatTransaction: newFiatTransaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.createTransaction = async (req, res) => {
  try {
    const { from_user_id, to_user_id, coin_id, amount, type, status } = req.body;

    if (!from_user_id || !to_user_id || !coin_id || !amount || !type || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = await Transaction.create({
      from_user_id,
      to_user_id,
      coin_id,
      amount,
      type,
      status,
    });

    return res
      .status(201)
      .json({
        message: "Transaction created successfully",
        transaction: newTransaction,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
