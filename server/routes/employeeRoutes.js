const express = require('express');
const employeeController = require('../controllers/employeeController');
const EauthController = require('../controllers/EauthController');
const requestController = require('../controllers/requestController');
const router = express.Router();

router.get('/:requestId', requestController.getRequestById);
router.get('/getAllRequestsByTeamId/:id', employeeController.getAllRequestsByTeamId);
router.post('/signup', EauthController.signup);
router.post('/login', EauthController.login);
router.post('/forgotPassword', EauthController.forgotPassword);
router.patch('/updateMyPassword', EauthController.protect, EauthController.updatePassword);
router.patch('/resetPassword/:token', EauthController.resetPassword);

// Modify the route for getting employee data
router.route('/me').get(employeeController.getMe, employeeController.getEmployee);

module.exports = router;
