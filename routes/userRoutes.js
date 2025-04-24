const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createUser', userController.createUser);
router.get('/detail/:id', userController.getUserById);

module.exports = router;