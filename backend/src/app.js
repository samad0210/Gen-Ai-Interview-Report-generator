const express = require ('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
// app.use(cors({
//     origin: 'https://gen-ai-interview-report-generator.netlify.app',
//     credentials: true
// }));

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://gen-ai-interview-report-generator.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json());
const authRoutes = require('./routes/auth.routes.js')
const interviewRoutes = require('./routes/interview.routes.js');

app.use('/api/auth',authRoutes);
app.use('/api/interview',interviewRoutes);

module.exports = app;
