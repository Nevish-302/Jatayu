import mongoose from "mongoose";
const {Schema} = mongoose;

const teamSchema = new Schema(
    {
        teamMembers:{
            type : Array,
            members : {
                type : String,
            }
        },
        sessionId : {type : String},
        location : {
            type : Object,
            long : {type : String},
            lat : {type : String},
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
    }
)

const team = mongoose.model('team',teamSchema);

export default team;