const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')
const Team = require("../models/team.model")
const Employee = require("../models/employeeModel")
const Organisation = require('../models/organisationModel')
exports.getMe = (req, res, next) => {
    req.params.id = req.employee.id;
    next();
};

exports.addEmployee = catchAsync(async (req, res, next) => {
    const {empId, teamId} = req.body
    let employee = await Employee.findOne({_id : empId})
    if(!Id || !employee)
    {
        //explain to me how AppError works once
        return new AppError(
              "Employee Not found",
              400
            )
        
    }
    if(employee.Team)
    {
        return new AppError(
            "Employee Already in a team ",
            403
          )
      
    }
    let team = await Team.findOne({_id : teamId})
    if(!team)
    {
        return new AppError(
            "No Such Team Exists ",
            405
          )
      
    }
    team = await Team.findOneAndUpdate({_id : teamId}, {$push : {teamMembers : empId}})
    employee = await Employee.findOneAndUpdate({_id : empId}, {Team : team._id})
    
    res.status(200).json({
        status: "success",
        data: {
            team : team.teamMembers,
        }
    })
})

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
    const teamList = Team.find({Organisation : Id})
    res.status(200).json({
        status: "success",
        data: {
            team : teamList,
        }
    })}
    else{
    const teamList = Team.find({sessionId : Id})    
    res.status(200).json({
            status: "success",
            data: {
                team : teamList,
            }
        })  
    }
})

exports.getTeam = factory.getOne(Team)
exports.deleteTeam = factory.deleteOne(Team)


