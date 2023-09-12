const Organisation = require('../models/organisationModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
    console.log(obj);
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });    
    return newObj;
  };
  
exports.getMe = (req, res, next) => {
    req.params.id = req.employee.id;
    next();
};

  
exports.createOrganisation = catchAsync(async(req, res) => {
    const {email} = await req.body;
    const org = await Organisation.findOne({"contact.email" : email});
    if(!org) 
    {
        const newOrg = Organisation.create(req.body);
        res.json(newOrg);
    }
    else throw new Error("Organisation Already exists");
})

exports.updateOrganisation = catchAsync(async(req, res, next) => {

    //If Change Password is attempted
    if (req.body.password || req.body.passwordConfirm) {
        return new AppError(
            "This route is not for password update , use /updateMyPassword for that ",
            400
          )
        
      }

    //values not supposed to be updated
    const filteredBody = filterObj(req.body, "name", "Id", "employees");
    
    const updatedOrganisation = await Employee.findByIdAndUpdate(req.organisation._id, filteredBody, {
        new: true,
        runValidators: true,
      });
    
    res.status(200).json({
        status: "success",
        data: {
            organisation : updatedOrganisation,
        }
    })
})


exports.getOrganisation = factory.getOne(Organisation);
exports.getAllOrganisation = catchAsync(async(req, res) => {
    const {_id, type} = req.body
    const {location} = await Organisation.findOne({_id : _id})
    //Add location filter using aggregation pipeline
    const Organisations = await Organisation.find({type : type})
})

exports.AcceptReqFromOff = catchAsync(async(req, res) => {
    const {request} = req.body
    const org = await Organisation.findOneAndUpdate({_id : OrgId, "notifications.at" : request.at}, {$set : {'notifications.$.status' : true}})
    const session = await Session.create({notifications : [request]})
    res.status(200).json({
        status: "success",
        data: {
            session : session,
        }
    })
})


exports.deleteEmployee = factory.deleteOne(Organisation);