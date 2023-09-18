const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')
const Team = require("../models/team.model")
const Employee = require("../models/employeeModel")
const Organisation = require('../models/organisationModel')
const Session = require('../models/session.model')

exports.getMe = (req, res, next) => {
    req.params.id = req.employee.id;
    next();
};

exports.addEmployee = catchAsync(async (req, res, next) => {
    const { empId, teamId } = req.body;
   
    // Find the employee by ID
    let employee = await Employee.findOne({ _id: empId });
  
    if (!employee) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found.",
      });
    }
  
    // Check if the employee is already in a team
    if (employee.Team) {
      return res.status(403).json({
        status: "error",
        message: "Employee is already in a team.",
      });
    }
  
    // Find the team by ID
    let team = await Team.findOne({ _id: teamId });
  
    if (!team) {
      return res.status(404).json({
        status: "error",
        message: "Team not found.",
      });
    }
  
    // Update the teamMembers and employee's team
    team = await Team.findOneAndUpdate({ _id: teamId }, { $push: { teamMembers: empId } });
    employee = await Employee.findOneAndUpdate({ _id: empId },  { team: team._id });
  
    res.status(200).json({
      status: "success",
      data: {
        team: team.teamMembers,
      },
    });
  });
  

exports.remEmployee = catchAsync(async (req, res, next) => {
    const {empId, teamId} = req.body
    let employee = await Employee.findOne({_id : empId})
    if(!Id || !employee)
    {
        //explain to me how AppError works once
        res.status(405).json({
            status: "failure",
            data: {
                Error : "Employee not found",
            }
        })
        
    }
    if(employee.Team)
    {
        res.status(405).json({
            status: "failure",
            data: {
                Error : "Employee already in a team",
            }
        })
      
    }
    let team = await Team.findOne({_id : teamId})
    if(!team)
    {
        res.status(405).json({
            status: "failure",
            data: {
                Error : "No such Team Exists",
            }
        })
      
    }
    team = await Team.findOneAndUpdate({_id : teamId}, {$pop : {teamMembers : empId}})
    employee = await Employee.findOneAndUpdate({_id : empId}, {Team : null})
    
    res.status(200).json({
        status: "success",
        data: {
            team : team.teamMembers,
        }
    })
})

exports.createTeam = factory.createOne(Team)

exports.getTeamByOrgSess = catchAsync(async(req, res) =>  {
    const {Id, OS} = req.body
    console.log("Hello", Id, OS)
    if(!Id)
    {
        res.status(405).json({
            status: "failure",
            data: {
                Error : "Organisation Not Found",
            }
        })
    }
    if(!OS){
    const teamList = await Team.find({Organisation : Id})
    res.status(200).json({
        status: "success",
        data: {
            team : teamList,
        }
    })}
    else{
    const teamList = await Team.find({sessionId : Id})    
    console.log(teamList)
    res.status(200).json({
            status: "success",
            data: {
                team : teamList,
            }
        })  
    }
})

exports.addTeamToSession = catchAsync(async (req, res) => {
    const {teamId, Sessionid} = req.body
    const session = await Session.findOneAndUpdate({_id : Sessionid}, {$push : {teams : teamId}})
    const team = await Team.findOneAndUpdate({_id : teamId}, {sessionId : Sessionid})
    team.teamMembers.forEach((member) => {
        Employee.findByIdAndUpdate({_id : member}, {"status.active" : true, "status.available" : false})
    })
    res.status(200).json({
        status: "success",
    })
})

exports.addTeamToOrganisation = async (req, res) => {
    try {
      const { organisationId, teamId } = req.body;
  
      // Find the organization by ID and update the teams array
      await Organisation.findByIdAndUpdate(
        organisationId,
        { $push: { teams: teamId } }
      );
  
      // Find the team by ID and update the organization reference
      await Team.findByIdAndUpdate(
        teamId,
        { organization: organisationId }
      );
  
      res.status(200).json({
        status: 'success',
        message: 'Team added to the organization successfully',
        teamId: teamId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

exports.sendReqToOrg = catchAsync((req, res) => {
    const {OrgId, request} = req.body
    Organisation.findOneAndUpdate({_id : OrgId}, {$push : {notifications : request}})
})

exports.getTeam = factory.getOne(Team)
exports.deleteTeam = factory.deleteOne(Team)


