const express = require('express');
const employeeController = require('../controllers/employeeController');
const EauthController = require('../controllers/EauthController');

const router = express.Router();

router.post('/signup', EauthController.signup);
router.post('/login', EauthController.login);
router.post('/forgotPassword', EauthController.forgotPassword);
router.patch(
  '/updateMyPassword',
  EauthController.protect,
  EauthController.updatePassword
);
router.patch('/resetPassword/:token', EauthController.resetPassword);

router.use(EauthController.protect);

router.route('/me').get(employeeController.getMe, employeeController.getEmployee);
router.patch('/updateMe', employeeController.updateMe);
router.delete('/deleteMe', employeeController.deleteMe);

router.use(EauthController.restrictTo('admin'));

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