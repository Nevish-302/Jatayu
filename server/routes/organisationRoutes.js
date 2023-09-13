const express = require('express');
const organisationController = require('../controllers/organisationController');
const OauthController = require('../controllers/OauthController');

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
//router
//  .route('/')
//  .get(organisationController.getAllEmployees)
//  .post(organisationController.createEmployee);
//
//router
//  .route('/:id')
//  .get(organisationController.getEmployee)
//  .patch(organisationController.updateEmployee)
//  .delete(organisationController.deleteEmployee);

module.exports = router;