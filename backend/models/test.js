const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
    {
        testName: { type: String, required: true, trim: true }, // e.g., "Unit Test 1"
        subject: { type: String, required: true, trim: true },
        batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
        maxMarks: { type: Number, required: true, default: 100, min: 1 },
        date: { type: Date, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Test', testSchema);