// use !mdbg for model

const mongoose = require('mongoose');

var organisationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    type:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Organisation', organisationSchema);