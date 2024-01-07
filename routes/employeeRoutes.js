const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', (req, res) => {
  Employee.getAllEmployees()
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving employees' });
    });
});

router.post('/', (req, res) => {
  const { firstName, lastName, roleId } = req.body;
  Employee.addEmployee(firstName, lastName, roleId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding an employee' });
    });
});

router.put('/:id/role', (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  Employee.updateEmployeeRole(id, roleId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while updating employee role' });
    });
});

module.exports = router;