const mongoose =require("mongoose");
const {Schema} = mongoose;
const Request = require('./requestModel');

const teamSchema = new Schema(
    {
        teamMembers:{
            type : Array,
            members : {
                type : mongoose.Schema.Types.ObjectId,
            }
        },
        sessionId : {
            type : mongoose.Schema.Types.ObjectId,
            required: [true, 'session should be specified'],
        },
        //location : {
        //    type : Object,
        //    long : {type : String},
        //    lat : {type : String},
        //},
        
        requests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Request',
            },
        ],
          
        resources:{
            type : Array,
            members : {
                name : {type : String},
                quantity : {type : String},
                organisationId : {
                    type : mongoose.Schema.Types.ObjectId,
                    required: true},
            }
        },
        Organisation : {
            type : mongoose.Schema.Types.ObjectId,
            required: true},
        redZones:{
            type : Array,
            members:{ 
            long : {
                type : String,
                required: true
                },
            lat : {
                type : String,
                required: true
                },
            severity : {
                type : Number,
                required: true
                }
            }
        },
    }
)

const Team = mongoose.model('Team',teamSchema);

// exports default Team;

module.exports=Team;