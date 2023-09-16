const express = require('express');
const organisationController = require('../controllers/organisationController');
const requestController = require('../controllers/requestController');
const SessionController = require('../controllers/sessionController')

const router = express.Router();

router.get('/requests/:requestId', requestController.getRequestById);
router.get('/getAllRequests/:orgId', organisationController.getAllRequests);
router.post('/createOrganisation', organisationController.createOrganisation);
router.patch('/updateOrganisation', organisationController.updateOrganisation);
router.get('/getOrganisation/:id', organisationController.getOrganisation);
router.get('/getAllOrganisationsBySession', organisationController.getAllOrganisationBySession);
router.get('/getAllOrganisations', organisationController.getAllOrganisation);
router.post('/acceptRequestFromOff', organisationController.AcceptReqFromOff);
router.delete('/deleteOrganisation/:id', organisationController.deleteOrganisation);
router.post('/getAllRequestsBySession', SessionController.getAllRequests)
router.post('/createSession', SessionController.createSession)
router.post('/addOrganisation', SessionController.addOrganisation)

module.exports = router;
