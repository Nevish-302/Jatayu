const Employee = require('./employeeModel');
const mongoose = require('mongoose');
const Session = require('./session.model'); 

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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

});

module.exports = mongoose.model('Organisation', organisationSchema);
