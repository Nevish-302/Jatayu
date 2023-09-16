const express = require('express');
const employeeController = require('../controllers/employeeController');
const EauthController = require('../controllers/EauthController');
const sessionController = require('../controllers/sessionController')
const requestController = require('../controllers/requestController');
const router = express.Router();

router.get('/:requestId', requestController.getRequestById);
router.get('/getAllRequestsByTeamId/:teamId', employeeController.getAllRequestsByTeamId);
router.post('/signup', EauthController.signup);
router.post('/login', EauthController.login);
router.post('/forgotPassword', EauthController.forgotPassword);
router.patch('/updateMyPassword', EauthController.protect, EauthController.updatePassword);
router.patch('/resetPassword/:token', EauthController.resetPassword);

// Modify the route for getting employee data
router.route('/me').get(employeeController.getMe, employeeController.getMe,employeeController.getEmployee);
router.route('/getEmp').get(employeeController.getAllEmployees);


router.get('/sessions/:sessionId', sessionController.getSessionById);
router.get('/sessions/byTeam/:teamId', sessionController.getSessionsByTeamId);


module.exports = router;
