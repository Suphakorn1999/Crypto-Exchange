const Orders = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { user_id, order_type, coin_id, price, amount, status } = req.body;

    if (!user_id || !order_type || !coin_id || !price || !amount || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = await Orders.create({
      user_id,
      order_type,
      coin_id,
      price,
      amount,
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
