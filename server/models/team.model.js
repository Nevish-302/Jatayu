const mongoose =require("mongoose");
const {Schema} = mongoose;
const Request = require('./requestModel');
const Employee = require('./employeeModel');

const teamSchema = new Schema(
    {
        teamMembers:{
            type : Array,
            members : {
                type : mongoose.Schema.Types.ObjectId,
                ref:'Employee'
            }
        },
        sessionId : {
            type : mongoose.Schema.Types.ObjectId,
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
                type : {type : String},
                quantity : {type : String},
                organisationId : {
                    type : mongoose.Schema.Types.ObjectId,
                    required: true},
                at : new Date,
            }
        },
        Organisation : {
            type : mongoose.Schema.Types.ObjectId,
            required: true
        },
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