const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');


console.log('Auth routes loaded');

router.post('/register', authController.signupController);
router.post('/login', authController.loginController);
router.patch('/edit/:userId', (req, res, next) => {
    console.log('PATCH /auth/edit/:userId hit with userId: ${req.params.userId}`');
    console.log('Request body:', req.body);
    next();
  }, authController.editUserController);
  
module.exports = router;
