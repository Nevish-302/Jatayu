const express = require('express');
const employeeController = require('../controllers/employeeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.route('/me').get(employeeController.getMe, employeeController.getEmployee);
router.patch('/updateMe', employeeController.updateMe);
router.delete('/deleteMe', employeeController.deleteMe);

router.use(authController.restrictTo('admin'));

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