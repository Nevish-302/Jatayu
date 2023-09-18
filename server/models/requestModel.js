const mongoose = require('mongoose');
const Employee = require('./employeeModel');

const requestSchema = new mongoose.Schema({
  senderId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  receiverId: {
    type: String,
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
            default:0,
        },
        casualities: {
            type : Number,
            default:0,
        },
        injured: {
            type : Number,
            default:0,
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
