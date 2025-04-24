const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/createWallet', walletController.createFiatWallet);
router.post('/createCryptoWallet', walletController.createCryptoWallet);
router.post('/createFiatTransaction', walletController.createFiatTransaction);
router.post('/createTransaction', walletController.createTransaction);


module.exports = router;