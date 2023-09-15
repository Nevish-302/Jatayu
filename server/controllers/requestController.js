// requestController.js
const Request = require('../models/requestModel');
const  Organisation = require('../models/organisationModel');

// Function to send a request
exports.sendRequest = async (req, res, next) => {
  try {
    // Assuming you have the necessary request data in req.body
    const newRequest = new Request(req.body);
    await newRequest.save();

    // Find the organization based on receiverId
    const organization = await Organisation.findOneAndUpdate(
      { Id: newRequest.receiverId },
      { $push: { requests: newRequest } }, // Add the new request to the requests array
      { new: true } // Return the updated organization document
    );

    // Check if the organization exists
    if (!organization) {
      return next(new AppError('Organization not found', 404));
    }

    // Emit a socket event to notify the organization about the new request
    // if (io) {
    //   io.emit('new-request', newRequest);
    // } else {
    //   console.error('Socket.io not initialized properly');
    // }

    res.status(201).json({ message: 'Request created successfully',
  data:newRequest });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating request' });
  }
};
