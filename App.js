const express=require('express');
const mongoose=require('mongoose');
const connectDB = require('./config/db');
const app=express();
const PORT=7799;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  
connectDB();
const employeeModal=require('./db/employeeSchema');
const employeRoutes=require('./routes/employeeRoutes');
app.use("/api",employeRoutes)

app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})
