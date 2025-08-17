const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const marksSchema = new Schema({
    studentId: { type: Types.ObjectId, ref: 'Student', required: true }, // ref -> Student
    test: { type: Types.ObjectId, ref: 'Test', required: true },       // ref -> Test
    marksObtained: { 
        type: Number, 
        required: true, 
        min: 0,
        max: 100
    },
}, { timestamps: true });

module.exports = mongoose.model('Marks', marksSchema);