const express = require('express');
const Employee = require('../models/employee');
const mainMenu = require('../views/mainMenu');
const readline = require('readline');
const employeeRoutes = require('./routes/employeeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

//rewrite in progress



















//end of index.js file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);
app.use('/departments', departmentRoutes);