const Teacher = require('../models/teacher');
const User = require('../models/users');

exports.addTeacher = async (req, res) => {
    const {firstname, lastname, email, phone, subjects, experience, highesQualification, joiningDate} = req.body;
    try {
        const newTeacher = new Teacher({
            firstname,
            lastname,
            email,
            phone,
            subjects,
            experience,
            highesQualification,
            joiningDate
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
        const username = email.split('@')[0]; 
        const password = newTeacher.firstname+ '123' + newTeacher.lastname;
        const user = new User({
            username,
            password, 
            role: 'teacher',
            teacherId: newTeacher._id
        });
        await user.save();
        console.log(`User created for teacher: ${username}`);
    } catch (error) {
        console.error("Error adding teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}