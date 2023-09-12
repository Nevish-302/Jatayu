import mongoose from "mongoose";
const {Schema} = mongoose;

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
            },
        },
        teams:{
            type : Array,
            members : {
                type : mongoose.Schema.Types.ObjectId,
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
        requests:{
            type : Array,
            members :{
            senderId : {type : mongoose.Schema.Types.ObjectId},
            message : {type : String},
            recieverId : {type : mongoose.Schema.Types.ObjectId},
            at : {type : new Date()},
            status : {type : Boolean}
            }
        },
        resources:{
            type : Array,
            members : {
                name : {type : String},
                quantity : {type : String},
                organisationId : {type : mongoose.Schema.Types.ObjectId},
                free: {type : Number},
                allocated : {
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
        // notifications: {
        //     type: Array,
        //     members: {
        //         senderId: { type: mongoose.Schema.Types.ObjectId },
        //         receiverId: { type: mongoose.Schema.Types.ObjectId },
        //         message: { type: String },
        //         at: { type: Date, default: Date.now() },
        //     },
        // },
        //for socket: type:String
    },
    {
            timestamps:true,
    }
)

const Session = mongoose.model('Session',sessionSchema);

// exports default Session;

module.exports=Session;
