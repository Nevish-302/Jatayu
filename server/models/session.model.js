const mongoose=require("mongoose");
const {Schema} = mongoose;
const Request = require('./requestModel');

const sessionSchema = new Schema(
    {
        initiatiorOrganisationId:{
            type : mongoose.Schema.Types.ObjectId,
            required: [true, 'initiator must be specified'],
        },
        organisations : {
            type: Array,
            members: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Organisation',
            },
        },
        teams:{
            type : Array,
            members : {
                type : mongoose.Schema.Types.ObjectId,
                ref:'Team',
            }
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
            radius:{
                type:Number,
                default:50,
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
        requests: {
            type : Array,
            members : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Request',
            }
        },        
        resources:{
            type : Array,
            members : {
                name : {type : String},
                quantity : {type : String},
                organisationId : {type : mongoose.Schema.Types.ObjectId},
                free: {type : Number},
                allocated :{
                    teamId: {type : mongoose.Schema.Types.ObjectId},
                    quantity : {type : Number}
                }
            }
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
        notifications : {
            type : Array,
            members : {
            senderId : {type : mongoose.Schema.Types.ObjectId},
            message : {type : String},
            at : new Date(),
            }
        },
        status: {
            type: Boolean, 
            default: true,
          },
    },
    {
            timestamps:true,
    }
)

const Session = mongoose.model('Session',sessionSchema);

// exports default Session;

module.exports=Session;
