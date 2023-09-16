const Session = require("../models/session.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Request = require("../models/requestModel")
const Organisation = require("../models/organisationModel");
const mongoose = require('mongoose')

exports.createSession = catchAsync(async (req, res) => {
    const {orgId, request} = await req.body
    const organisation = await Organisation.findOne({_id : orgId})
    if(!organisation)
    {
        res.status(400).json({
            status: "failure",
            data: {
                message : 'You Need to be an organisation to create a session',
            }
        })
    }
    const session = await Session.create({initiatiorOrganisationId : organisation._id, organisations : [organisation._id], requests : [request]})
    res.status(200).json({
        status: "session",
        data: {
            data : session,
        }
    })
})

exports.addOrganisation = catchAsync(async (req, res) => {
    const {reqOrg, tarOrg, sessionId} = await req.body
    const ReqOrg = await Organisation.findOne({_id : reqOrg})
    const TarOrg = await Organisation.findOne({_id : tarOrg})
    const session = await Session.findOne({_id : sessionId})
    if(!ReqOrg || !TarOrg)
    {
        res.status(400).json({
            status: "failure",
            data: {
                message : 'You Need to be an organisation take this actiion',
            }
        })
    }
    //const organisations = await session.organisations
    //const jack = mongoose.Types.ObjectId(reqOrg)
    //console.log(organisations, jack)
    //const con = organisations.find((org) => {
    //    org == reqOrg
    //})
    //console.log(con)
    //if(!con || !session.status)
    //{
    //    res.status(401).json({
    //        status: "failure",
    //        data: {
    //            message : 'Action Not Allowed',
    //        }
    //    })
//
    //}
    //console.log("Hello")
    const updatedSession = await Session.findOneAndUpdate({_id : session._id}, {$push : {organisations : TarOrg._id}})
    res.status(200).json({
        status: "session",
        data: {
            data : updatedSession,
        }
    })
})

exports.getAllRequests = catchAsync(async (req, res) => {
    const {sessionId} = await req.body
    const session = await Session.findOne({_id : sessionId})
    if(!session)
    {
        res.status(401).json({
            status: "failure",
            data: {
                message : 'Incorrect Session Id',
            }
        })

    }
    const requests = await Request.find({sessionId : sessionId})
    res.status(200).json({
        status: "session",
        data: {
            data : requests,
        }
    })
})