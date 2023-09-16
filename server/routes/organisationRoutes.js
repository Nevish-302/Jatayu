const express = require('express');
const organisationController = require('../controllers/organisationController');
const requestController = require('../controllers/requestController');
const SessionController = require('../controllers/sessionController')
const teamController = require('../controllers/teamController')
const OauthController = require('../controllers/OauthController');
const { protect } = require('../controllers/OauthController');

const router = express.Router();


router.post('/signup', OauthController.signup);
router.post('/login', OauthController.login);
router.post('/forgotPassword', OauthController.forgotPassword);
router.patch('/resetPassword/:token', OauthController.resetPassword);
router.patch('/updatePassword', protect, OauthController.updatePassword)
router.get('/requests/:requestId', requestController.getRequestById);
router.get('/getAllRequests/:orgId', organisationController.getAllRequests);
router.post('/createOrganisation', organisationController.createOrganisation);
router.patch('/updateOrganisation', organisationController.updateOrganisation);
router.get('/getOrganisation/:id', organisationController.getOrganisation);
router.get('/getAllOrganisationsBySession', organisationController.getAllOrganisationBySession);
router.get('/getAllOrganisations', organisationController.getAllOrganisation);
router.post('/acceptRequestFromOff', organisationController.AcceptReqFromOff);
router.delete('/deleteOrganisation/:id', organisationController.deleteOrganisation);
router.get('/getAllRequestsBySession', SessionController.getAllRequests)
router.post('/createSession', SessionController.createSession)
router.post('/addOrganisation', SessionController.addOrganisation)
router.route('/teamCreate').post(teamController.createTeam)	
router.route('/addToTeam').post(teamController.addEmployee)

module.exports = router;
