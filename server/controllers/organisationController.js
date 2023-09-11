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

exports.createOrganisation = catchAsync(async(req, res) => {
    const {id} = await req.body;
    const org = await Organisation.findOne({_id : id});
    if(org) 
    {
        const newOrg = Organisation.findOneAndUpdate({_id : id}, {});
        res.json(newOrg);
    }
    else throw new Error("No Such Organisation");
})

exports.updateOrganisation = catchAsync(async(req, res, next) => {
    const filteredBody = filterObj(req.body, "name", "email");
})