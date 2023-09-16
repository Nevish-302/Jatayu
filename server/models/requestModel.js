const mongoose = require('mongoose');
const Employee = require('./employeeModel');

const requestSchema = new mongoose.Schema({
  senderId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    // required: true,
  },
  teamId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required:true,
  },
  sessionId:{
    type:String,
    // required:true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  estimatedAffectees:{
    type:Number,
},
location:{
    type : Object,
    long:{
        type : String,
    },
    lat : {
        type : String
    },
    // radius:{
    //     type:Number,
    //     default:50,
    // }
},
redZones:{
  type : Array,
  members : { 
  long : {type : String},
  lat : {type : String},
  severity : {type : Number},
  radius : {
      type: Number,
      default : 10,
  },
  }
},
affectees: {
    type : Array,
    members: {
        survivors:{
            type : Number,
        },
        casualities: {
            type : Number,
        },
        injured: {
            type : Number,
        },
        teamId : {
            type : mongoose.Schema.Types.ObjectId,
        },
        location: {
            type : Object,
            long:{
                type : String,
            },
            lat : {
                type : String
            }
        }
    }
},
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
