var express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');


var goalController = require('../controller/goal.controller');
const authRoutes = require('./auth.routes'); 

console.log('goalController:', goalController);

router.route('/goal/getAll').get(authenticate, goalController.getDataControllerfn);

router.route('/goal/create').post(authenticate, goalController.createGoalControllerFn);

router.route('/goal/update/:id').patch(authenticate, goalController.updateGoalController);

router.route('/goal/delete/:id').delete(authenticate, goalController.deleteGoalController);

router.use('/auth', authRoutes);

module.exports = router;
