// requestController.js
const Request = require('../models/requestModel');
const { io } = require('../index'); // Import the 'io' object
// const {viewRequest} = require('../../Usocket/index')

// Function to send a request
exports.sendRequest = async (req, res, next) => {
  try {
    // Assuming you have the necessary request data in req.body
    const newRequest = new Request(req.body);
    await newRequest.save();

    // Emit a socket event to notify the organization about the new request
    if (io) {
      io.emit('new-request', newRequest);
    } else {
      console.error('Socket.io not initialized properly');
    }

    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating request' });
  }
};


exports.acceptOrRejectRequest = async (req, res, next , socket) => {
    try {
      // Extract necessary data from the request body
      const { senderId, status } = req.body;
  
      // Find the request by its ID
      const request = await Request.findOne({senderId});
  
      // Check if the request exists
      if (!request) {
        return next(new AppError('Request not found', 404));
      }
  
      // Update the request status (either 'approved' or 'rejected')
      request.status = status;
      await request.save();
  
      res.status(200).json({
        status: 'success',
        message: `Request ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing request' });
    }
  };

  exports.getRequests =(request)=> async (req, res, next) => {
    try {
      // Replace 'orgId' with your organization identifier (e.g., organization ID)
      
        // const request = viewRequest();

        console.log("req" , request);

    //   const {receiverId} = req.params;
  
    //   // Find all requests sent to the organization with the given orgId
    //   const requests = await Request.find({ receiverId });
  
    //   res.status(200).json({
    //     status: 'success',
    //     data: {
    //       requests,
    //     },
    //   });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving requests' });
    }
  };