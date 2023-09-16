const Employee = require('./employeeModel');
const mongoose = require('mongoose');
const Session = require('./session.model'); 
const Request = require('./requestModel'); 
const bcrypt=require("bcryptjs");

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type : Object,
        long:{
            type : String,
        },
        lat : {
            type : String
        }
    },
    password: {
        type: String,
        required: [true, 'Org must enter a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Enter confirm password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'The password is not matched',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        },
    ],
    resources: [
        {
            type: {
                type: String,
            },
            number: {
                type: Number,
            },
            available: {
                type: Boolean,
                default : true,
            },
        },
    ],

    sessions: [
        {
            sessionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Session',
            },
            active: {
                type: Boolean,
                default : true,
            },
            timeStamp: {
                type: Date,
                default: Date.now, 
            },
        },
    ],

    lastReported: {
        type: Date,
        default: null, 
    },

    Id: {
        type: String,
    },
    contact: {
        phone: {
            type: [
                {
                    type: String,
                },
            ],
        },
        email: {
            type: String,
            unique: true,
        },
        website: {
            type: String,
        },
    },
    notifications : {
        type : Array,
        members : {
        senderId : {type : mongoose.Schema.Types.ObjectId},
        message : {type : String},
        status : {type : Boolean},
        at : new Date(),
        }
    },
    areaOfExpertise: {
        type: [
            {
                type: String,
            },
        ],
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request',
        },
    ],
    
});

organisationSchema.pre('save', async function (next) {
    //this will run only if the password is modified
    if (!this.isModified('password')) return next();
  
    //this will encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
  
    //to delete confirm password from database
    this.passwordConfirm = undefined;
  
    next();
  });
  
  organisationSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
  
    next();
  });
  
  organisationSchema.pre(/^find/, async function (next) {
    this.find({ active: { $ne: false } });
    next();
  });
  
  organisationSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  organisationSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimeStamp;
    }
    return false;
  };
  
  organisationSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    console.log({ resetToken }, this.passwordResetToken);
  
    return resetToken;
  };

module.exports = mongoose.model('Organisation', organisationSchema);
