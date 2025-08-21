const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.post('/add-teacher', adminController.addTeacher);
adminRouter.post('/add-student-and-parent', adminController.addStudentAndParent);

module.exports = adminRouter;
