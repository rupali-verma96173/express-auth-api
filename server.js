require("dotenv").config();
// console.log("ENV Loaded:", process.env.JWT_SECRET);
const cookieParser = require("cookie-parser");

const express = require('express');

const userRoutes = require('./routes/userRoutes.js');
const facultyRoutes = require('./routes/facultyRoutes.js');

const connectDB = require('./database/dbConfig.js');


const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/faculty',facultyRoutes);

connectDB();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});