const express = require('express');
const app = express();
require('dotenv').config();
const sequelize  = require('../config/database');

const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send(
      `<h1 style=text-align:center;>
  🎉Welcome To API🎉
  </h1>`,
  );
});

sequelize.sync({ force: false, alter: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
  app.listen(5000, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
});


