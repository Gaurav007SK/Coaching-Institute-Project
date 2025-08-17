const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student", "parent"],
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: false
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: false
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Add validation to ensure only one ID field is populated based on role
userSchema.pre('save', function(next) {
  const role = this.role;
  
  if (role === 'student' && !this.studentId) {
    return next(new Error('Student role requires studentId'));
  }
  if (role === 'teacher' && !this.teacherId) {
    return next(new Error('Teacher role requires teacherId'));
  }
  if (role === 'parent' && !this.parentId) {
    return next(new Error('Parent role requires parentId'));
  }
  
  next();
});

module.exports = mongoose.model("User", userSchema);