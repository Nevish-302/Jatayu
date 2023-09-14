// requestController.js
const Request = require('../models/requestModel');
const  Organisation = require('../models/organisationModel');

// Function to send a request
exports.sendRequest = async (req, res, next) => {
  try {
    // Assuming you have the necessary request data in req.body
    const newRequest = new Request(req.body);
    await newRequest.save();

    // Emit a socket event to notify the organization about the new request
    // if (io) {
    //   io.emit('new-request', newRequest);
    // } else {
    //   console.error('Socket.io not initialized properly');
    // }

    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating request' });
  }
};
exports.getRequest = async (req, res, next) => {
  try {
    // Extract necessary data from the request body
    const { senderId, status } = req.body;

    // Find the request by its MongoDB _id (assuming you have _id in the request body)
    const { _id } = req.body;
    const request = await Request.findOne({ _id });

    // Check if the request exists
    if (!request) {
      return next(new AppError('Request not found', 404));
    }

    // Update the request status (either 'approved' or 'rejected')
    // request.status = status;
    // await request.save();

    // Find the organization based on receiverId
    const organization = await Organisation.findOne({ Id: request.receiverId });

    // Check if the organization exists
    if (!organization) {
      return next(new AppError('Organization not found', 404));
    }

    // Add the request to the organization's requests array
    organization.requests.push(request);

    // Save the organization document to update it with the new request
    await organization.save();

    // Emit a socket event to notify about the new request
    // if (io) {
    //   io.emit('get-request', request, organisation);
    // } else {
    //   console.error('Socket.io not initialized properly');
    // }
    console.log("req",request);
    console.log("org",organization);
    res.status(200).json({
      status: 'success',
      message: `Request ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' });
  }
};

//Caused error:
  exports.getRequests = async (req, res, next) => {
    try {
      // Replace 'orgId' with your organization identifier (e.g., organization ID)
      
        // const request = viewRequest();

        // console.log("req" , request);

      //   socket.on("get-request" ,async(request) =>{
      //     Request = request;
      //     if(request.senderId && request.receiverId){
      //       const reqOrg = await Request.create(request)
      //       const sendOrg = await Organisation.findOneAndUpdate({_id : request.senderId}, {$push : {requests : request}})
      //       const receiveOrg = await Organisation.findOneAndUpdate({_id : request.receiverId}, {$push : {requests : request}})
      //       console.log(reqOrg)
      //     console.log(request);
      
      //   }
      // })

      const {receiverId} = req.params;
  
      // Find all requests sent to the organization with the given orgId
      const requests = await Request.find({ receiverId });
  
      res.status(200).json({
        status: 'success',
        data: {
          requests,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving requests' });
    }
  };