const express = require('express');
const adminRouter = express.Router();
const { signUp } = require('../controller/admin/main.controller');
const validationResult = require('../middleware/user/validation.middleware');
const validateAdminData = require('../middleware/admin/validation.middleware');


adminRouter.post('/', validateAdminData, validationResult, signUp);


module.exports = adminRouter;