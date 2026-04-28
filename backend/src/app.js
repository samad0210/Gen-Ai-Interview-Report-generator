const express = require ('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
// app.use(cors({
//     origin: 'https://gen-ai-interview-report-generator.netlify.app',
//     credentials: true
// }));


app.use(cors({
  origin: "https://gen-ai-interview-report-generator.netlify.app",
  credentials: true
}));



app.use(express.json());
const authRoutes = require('./routes/auth.routes.js')
const interviewRoutes = require('./routes/interview.routes.js');

app.use('/api/auth',authRoutes);
app.use('/api/interview',interviewRoutes);

module.exports = app;
