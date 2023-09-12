const Employee = require('./employeeModel');
const mongoose = require('mongoose');
const Session = require('./session.model'); 

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
        type: {
            long: String,
            lat: String,
        },
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
    areaOfExpertise: {
        type: [
            {
                type: String,
            },
        ],
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
