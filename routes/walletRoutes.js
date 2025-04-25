const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/createTransaction', walletController.createTransaction);
router.post('/createFiatTransaction', walletController.createFiatTransaction);
router.post('/CreateCyptoWallet', walletController.CreateCyptoWallet);
router.post('/CreateFiatWallet', walletController.CreateFiatWallet);


module.exports = router;