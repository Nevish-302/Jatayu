const express = require('express');
const employeeController = require('../controllers/employeeController');
const EauthController = require('../controllers/EauthController');
const {sendRequest} = require("../controllers/requestController")
const router = express.Router();

router.post('/signup', EauthController.signup);
router.post('/login', EauthController.login);
router.post('/forgotPassword', EauthController.forgotPassword);
router.patch(
  '/updateMyPassword',
  EauthController.protect,
  EauthController.updatePassword
);

router.patch("/sendRequest" , sendRequest)
router.patch('/resetPassword/:token', EauthController.resetPassword);

// router.use(EauthController.protect);
router.route('/getEmp').get(employeeController.getAllEmployees);
router.route('/me').get(employeeController.getMe, employeeController.getEmployee);

module.exports = router;