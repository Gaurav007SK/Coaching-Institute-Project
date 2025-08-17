const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
    },
    course: {
    type: String,
    required: true,
    trim: true
    },
    teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
    },
    maxStudents: {
    type: Number,
    required: true,
    min: 1,
    default: 30
    },
    startDate: {
    type: Date,
    required: true,
    },
    endDate: {
    type: Date,
    required: true,
    },
    isActive: {
    type: Boolean,  
    default: true,
    },
},
{ timestamps: true }
);
module.exports = mongoose.model('Batch', batchSchema);