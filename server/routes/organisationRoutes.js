const express = require('express');
const organisationController = require('../controllers/organisationController');
const requestController = require('../controllers/requestController');
const teamController = require('../controllers/teamController')
const sessionController = require('../controllers/sessionController')
const OauthController = require('../controllers/OauthController');
const EauthController = require('../controllers/EauthController');
const employeeController = require("../controllers/employeeController")


const { protect } = require('../controllers/OauthController');

const router = express.Router();


router.post('/signup', OauthController.signup);
router.post('/login', OauthController.login);
router.post('/forgotPassword', OauthController.forgotPassword);
router.patch('/resetPassword/:token', OauthController.resetPassword);
router.patch('/updatePassword', protect, OauthController.updatePassword)

router.post('/employee-signup', EauthController.signup);
router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.get('/requests/:requestId', requestController.getRequestById);
router.get('/getAllRequests/:orgId', organisationController.getAllRequests);

router.post('/createOrganisation', organisationController.createOrganisation);
router.patch('/updateOrganisation', organisationController.updateOrganisation);
router.get('/getOrganisation/:id', organisationController.getOrganisation);
router.get('/getAllOrganisationsBySession', organisationController.getAllOrganisationBySession);
router.get('/getAllOrganisations', organisationController.getAllOrganisation);

// is this function not working?
// router.post('/acceptRequestFromOff', organisationController.AcceptReqFromOff);
router.delete('/deleteOrganisation/:id', organisationController.deleteOrganisation);
router.get('/getAllRequestsBySession', sessionController.getAllRequests)
router.post('/createSession', sessionController.createSession)
router.post('/addOrganisation', sessionController.addOrganisation)
router.route('/teamCreate').post(teamController.createTeam)	
router.route('/addToTeam').post(teamController.addEmployee)
router.get('/sessions/byOrganisation/:organisationId', sessionController.getSessionsByOrganisationId);
router.get('/teams/byOrganisation/:organisationId', teamController.getAllTeamsByOrganisationId);
router.get('/sessions/:sessionId', sessionController.getSessionById);
router.post('/sessions/addTeamToSession', teamController.addTeamToSession)
router.post('/getTeams', teamController.getTeamByOrgSess)

module.exports = router;
