const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', (req, res) => {
  Employee.getAllRoles()
    .then((roles) => {
      res.json(roles);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving roles' });
    });
});

router.post('/', (req, res) => {
  const { roleName } = req.body;
  Employee.addRole(roleName)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding a role' });
    });
});

module.exports = router;