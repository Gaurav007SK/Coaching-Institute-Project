const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    subjects: [{
        type: String,
        required: true,
        trim: true
    }],
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    qualifications: [{
        type: String,
        required: true,
        trim: true
    }],
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Teacher', teacherSchema);