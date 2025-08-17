const mongoose = require('mongoose');
const Student = require('./student');

const attendanceSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'late'],
            required: true,
        },
        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher', 
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

// Normalize date to midnight (so date uniqueness is by day, not time)
attendanceSchema.pre('save', function (next) {
    if (this.date) {
        const d = new Date(this.date);
        d.setHours(0, 0, 0, 0);
        this.date = d;
    }
    next();
});

// Prevent duplicate attendance records for same student on the same day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);