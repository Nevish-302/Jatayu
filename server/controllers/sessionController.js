const Session = require("../models/session.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Request = require("../models/requestModel")
const Organisation = require("../models/organisationModel");
const mongoose = require('mongoose')
const objectId = new mongoose.Types.ObjectId();

// exports.createSession = catchAsync(async (req, res) => {
//     const {orgId, request} = await req.body
//     const organisation = await Organisation.findOne({_id : orgId})
//     if(!organisation)
//     {
//         res.status(400).json({
//             status: "failure",
//             data: {
//                 message : 'You Need to be an organisation to create a session',
//             }
//         })
//     }
//     const session = await Session.create({initiatiorOrganisationId : organisation._id, $push : {organisations : organisation._id}, $push : {requests : request}})
//     res.status(200).json({
//         status: "session",
//         data: {
//             data : session,
//         }
//     })
// })

// exports.createSession = catchAsync(async (req, res) => {
//     const { orgId, request } = await req.body;
//     const organisation = await Organisation.findOne({ _id: orgId });
  
//     if (!organisation) {
//       return res.status(400).json({
//         status: 'failure',
//         data: {
//           message: 'You Need to be an organisation to create a session',
//         },
//       });
//     }
  
//     // Check the severity of the request and add red zones if it's 0, 1, or 2
//     const redZones = [];
//     if (request.severity >= 0 && request.severity <= 2) {
//       redZones.push({
//         long: request.location.long,
//         lat: request.location.lat,
//         severity: request.severity,
//       });
//     }
  
//     const session = await Session.create({
//       initiatiorOrganisationId: organisation._id,
//       organisations: [organisation._id],
//       requests: [request],
//       redZones: redZones, // Add red zones here
//     });
  
//     // Add red zones to the team if available
//     if (request.teamId) {
//       const team = await Team.findOne({ _id: request.teamId });
//       if (team) {
//         team.redZones = redZones;
//         await team.save();
//       }
//     }
  
//     res.status(200).json({
//       status: 'session',
//       data: {
//         data: session,
//       },
//     });
//   });
  

exports.createSession = catchAsync(async (req, res) => {
  const { orgId, request } = await req.body;
  const organisation = await Organisation.findOne({ _id: orgId });

  if (!organisation) {
    return res.status(400).json({
      status: 'failure',
      data: {
        message: 'You Need to be an organisation to create a session',
      },
    });
  }

  // Check the severity of the request and add red zones if it's 0, 1, or 2
  const redZones = [];
  if (request.severity >= 0 && request.severity <= 2) {
    redZones.push({
      long: request.location.long,
      lat: request.location.lat,
      severity: request.severity,
    });
  }

  const session = await Session.create({
    initiatiorOrganisationId: organisation._id,
    organisations: [organisation._id],
    requests: [request],
    redZones: redZones, // Add red zones here
  });

  // Add red zones to the team if available
  if (request.teamId) {
    const team = await Team.findOne({ _id: request.teamId });
    if (team) {
      team.redZones = redZones;
      await team.save();
    }
  }

  res.status(200).json({
    status: 'session',
    data: {
      data: session,
    },
  });
});


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
    //req.params?
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

exports.getSessionById = catchAsync(async (req, res) => {
    const { sessionId } = req.params;
  
    // Check if sessionId is a valid ObjectId (mongoose object ID)
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        status: 'failure',
        data: {
          message: 'Invalid sessionId format',
        },
      });
    }
  
    const session = await Session.findById(sessionId);
  
    if (!session) {
      return res.status(404).json({
        status: 'failure',
        data: {
          message: 'Session not found',
        },
      });
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        session: session,
      },
    });
  });
  exports.getSessionsByTeamId = catchAsync(async (req, res) => {
    const { teamId } = req.params;
  console.log(teamId);

  const Id = new mongoose.Types.ObjectId(teamId);

    const sessions = await Session.find({
      teams: Id,
    });

console.log(sessions);

    if (!sessions.length) {
      return res.status(404).json({
        status: 'failure',
        data: {
          message: 'No sessions found for the specified teamId',
        },
      });
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        sessions: sessions,
      },
    });
  });
  

  exports.getSessionsByOrganisationId = catchAsync(async (req, res) => {
    const { organisationId } = req.params;
    let { sortBy } = req.query; // Get the sorting option from query parameters
  
    // Set a default value for sortBy if it's not provided in the query string
    if (!sortBy || !['createdAt', 'active'].includes(sortBy)) {
      sortBy = 'active'; // You can change this to another default value if needed
    }
  
    const sortOptions = {};
    sortOptions[sortBy] = 1; // Default ascending order
  
    // Check if sortBy is 'active' to sort by 'active' field
    if (sortBy === 'active') {
      sortOptions['createdAt'] = 1; // Add createdAt for secondary sorting
    }
  
    try {
      const sessions = await Session.find({
        organisations: mongoose.Types.ObjectId(organisationId),
      })
        .sort(sortOptions)
        .exec();
  
      if (!sessions.length) {
        return res.status(404).json({
          status: 'failure',
          data: {
            message: 'No sessions found for the specified organisationId',
          },
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          sessions: sessions,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  });
  