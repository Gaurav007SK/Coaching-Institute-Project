const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.post('/add-teacher', adminController.addTeacher);

module.exports = adminRouter;
