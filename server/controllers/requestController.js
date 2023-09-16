const Request = require('../models/requestModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Function to get a request by requestId
exports.getRequestById = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;

  if (!requestId) {
    return next(new AppError('Request ID is missing.', 400));
  }

  const request = await Request.findById(requestId);

  if (!request) {
    return next(new AppError('Request not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});
