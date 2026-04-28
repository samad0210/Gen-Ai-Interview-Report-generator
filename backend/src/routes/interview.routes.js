const express = require('express');
const interviewController = require('../controllers/interview.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const upload = require('../middlewares/file.middleware.js')

const interviewrouter = express.Router();

interviewrouter.post('/', authMiddleware.authUser,upload.single('resume'), interviewController.generateInterViewReportController);

interviewrouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

interviewrouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

interviewrouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


module.exports = interviewrouter;