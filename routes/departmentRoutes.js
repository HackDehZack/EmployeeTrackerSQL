const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', (req, res) => {
  Employee.getAllDepartments()
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving departments' });
    });
});

router.post('/', (req, res) => {
  const { departmentName } = req.body;
  Employee.addDepartment(departmentName)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding a department' });
    });
});

module.exports = router;