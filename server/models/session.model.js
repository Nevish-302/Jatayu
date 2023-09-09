import mongoose from "mongoose";
const {Schema} = mongoose;

const sessionSchema = new Schema(
    {
        initiatiorOrganisationId:{
            type : String,
        },
        organisations : {
            type: Array,
            members: {
                type: String,
            },
        },
        teams:{
            type : Array,
            members : {
                type : String,
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
                    type : String,
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
            senderId : {type : String},
            message : {type : String},
            recieverId : {type : String},
            at : {type : new Date()},
            status : {type : Boolean}
            }
        },
        resources:{
            type : Array,
            members : {
                name : {type : String},
                quantity : {type : String},
                organisationId : {type : String},
                free: {type : Number},
                allocated : {
                    teamId: {type : String},
                    quantity : {type : Number}
                }
            }
        },
        redZones:{
            type : Array,
            members : { 
            long : {type : String},
            lat : {type : String},
            severity : {type : Number}
            }
        },
        notifications : {
            type : Array,
            members : {
            senderId : {type : String},
            message : {type : String},
            at : new Date(),
            }
        }
    }
)

const session = mongoose.model('session',sessionSchema);

export default session;