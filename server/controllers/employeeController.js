const Employee = require("../models/employeeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

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

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)check if employee is trying to update password

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update , use /updateMyPassword for that ",
        400
      )
    );
  }

  //2)filtered out field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  //3) update employee document
  const updatedEmployee = await Employee.findByIdAndUpdate(req.employee._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      employee: updatedEmployee,
    },
  });
});

exports.deleteMe = async (req, res, next) => {
  await Employee.findByIdAndUpdate(req.employee._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
};

//we will update anything except password
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);
exports.createEmployee = factory.createOne(Employee);
exports.getEmployee = factory.getOne(Employee);
exports.getAllEmployees = factory.getAll(Employee);