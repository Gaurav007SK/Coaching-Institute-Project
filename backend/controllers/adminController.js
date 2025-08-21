const Teacher = require("../models/teacher");
const User = require("../models/users");
const Parent = require("../models/parent");
const Student = require("../models/student");

exports.addTeacher = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    subjects,
    experience,
    highesQualification,
    joiningDate,
  } = req.body;
  try {
    const newTeacher = new Teacher({
      firstname,
      lastname,
      email,
      phone,
      subjects,
      experience,
      highesQualification,
      joiningDate,
    });

    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher added successfully", teacher: newTeacher });
    const username = email.split("@")[0];
    const password = newTeacher.firstname + "123" + newTeacher.lastname;
    const user = new User({
      username,
      password,
      role: "teacher",
      teacherId: newTeacher._id,
    });
    await user.save();
    console.log(`User created for teacher: ${username}`);
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addStudentAndParent = async (req, res) => {
  const {
    Sfirstname,
    Slastname,
    Semail,
    Sphone,
    Sgender,
    SdateOfBirth,
    batchId,
    Pfirstname,
    Plastname,
    Pemail,
    Pphone,
    PdateOfBirth,
    address,
    relationWithChild,
  } = req.body;

  try {
    const newStudent = new Student({
      firstname: Sfirstname,
      lastname: Slastname,
      email: Semail,
      phone: Sphone,
      gender: Sgender,
      dateOfBirth: SdateOfBirth,
      batchId: batchId,
    });
    await newStudent.save();

    const existingParent = await Parent.findOne({ email: Pemail });
    if (existingParent) {
      existingParent.childId.push(newStudent._id);
      await existingParent.save();
      return res
        .status(200)
        .json({
          message: "Parent updated successfully",
          parent: existingParent,
        });
    } else {
      try {
        const newParent = new Parent({
          firstname: Pfirstname,
          lastname: Plastname,
          email: Pemail,
          phone: Pphone,
          dateOfBirth: PdateOfBirth,
          address: address,
          childId: [newStudent._id],
          relationWithChild: relationWithChild,
        });

        await newParent.save();
        
        const parentId = newParent._id;
        newStudent.parentId = parentId;
        await newStudent.save();

        const studentUsername = Semail.split("@")[0];
        const studentPassword = Sfirstname + "123" + Slastname;
        const studentUser = new User({
          username: studentUsername,
          password: studentPassword,
          role: "student",
          studentId: newStudent._id,
        });
        await studentUser.save();
        console.log(`User created for student: ${studentUsername}`);

        const username = Pemail.split("@")[0];
        const password = newParent.firstname + "123" + newParent.lastname;
        const user = new User({
          username,
          password,
          role: "parent",
          parentId: newParent._id,
        });
        await user.save();
        console.log(`User created for parent: ${username}`);

        res.status(201).json({
          message: "Student and parent added successfully",
          student: newStudent,
          parent: newParent,
        });
      } catch (error) {
        console.error("Error adding student and parent:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error adding student and parent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
