const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest, ensureAuth } = require('../middlewares/authMiddleware');

router.get('/login', ensureGuest, authController.renderLogin);
router.post('/login', ensureGuest, authController.loginUser);

router.get('/logout', ensureAuth, authController.logout);

module.exports = router;
