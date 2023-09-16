const mongoose = require('mongoose'); 
const bcrypt=require("bcryptjs");
const Team=require("./team.model.js");
const Organisation=require("./organisationModel.js");

const employeeSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: [true,'Employee must have an Id'],
        unique: true,
        index: true,
    },
    name:{
      type:String,
      required:true
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
      required: [true, 'Employee must enter password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'enter confirm password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: ' the password is not matched',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    status: {
      type: {
          active: {
              type: Boolean,
              default: false, 
          },
          available: {
              type: Boolean,
              default: true, 
          },
      },
  },

    role: {
        type: String,
        required: true,
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team"
       },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organisation"
    }
});

employeeSchema.pre('save', async function (next) {
    //this will run only if the password is modified
    if (!this.isModified('password')) return next();
  
    //this will encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
  
    //to delete confirm password from database
    this.passwordConfirm = undefined;
  
    next();
  });
  
  employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
  
    next();
  });
  
  employeeSchema.pre(/^find/, async function (next) {
    this.find({ active: { $ne: false } });
    next();
  });
  
  employeeSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  employeeSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimeStamp;
    }
    return false;
  };
  
  employeeSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    console.log({ resetToken }, this.passwordResetToken);
  
    return resetToken;
  };

module.exports = mongoose.model('Employee', employeeSchema);
