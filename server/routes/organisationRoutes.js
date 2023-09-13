const express = require('express');
const organisationController = require('../controllers/organisationController');
const OauthController = require('../controllers/OauthController');
const EauthController = require('../controllers/EauthController');
const employeeController = require("../controllers/employeeController")

const router = express.Router();

router.post('/signup', OauthController.signup);
router.post('/login', OauthController.login);
router.post('/forgotPassword', OauthController.forgotPassword);
router.patch(
  '/updateMyPassword',
  OauthController.protect,
  OauthController.updatePassword
);
router.patch('/resetPassword/:token', OauthController.resetPassword);

router.use(OauthController.protect);

router.route('/me').get(organisationController.getMe, organisationController.getOrganisation);

router.patch('/updateMe', organisationController.updateOrganisation);
router.delete('/deleteMe', organisationController.deleteOrganisation);

//router.use(OauthController.restrictTo('admin'));
//
router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;

