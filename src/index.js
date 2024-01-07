const express = require('express');
const Employee = require('../models/employee');
const mainMenu = require('../views/mainMenu');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const employee = new Employee();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(mainMenu);
});

app.get('/employees', (req, res) => {
  employee.getAllEmployees()
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving employees' });
    });
});

app.get('/roles', (req, res) => {
  employee.getAllRoles()
    .then((roles) => {
      res.json(roles);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving roles' });
    });
});

app.get('/departments', (req, res) => {
  employee.getAllDepartments()
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving departments' });
    });
});

app.post('/employees', (req, res) => {
  const { firstName, lastName, roleId } = req.body;
  employee.addEmployee(firstName, lastName, roleId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding an employee' });
    });
});

app.post('/roles', (req, res) => {
  const { roleName } = req.body;
  employee.addRole(roleName)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding a role' });
    });
});

app.post('/departments', (req, res) => {
  const { departmentName } = req.body;
  employee.addDepartment(departmentName)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while adding a department' });
    });
});

app.put('/employees/:id/role', (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  employee.updateEmployeeRole(id, roleId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while updating employee role' });
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

function displayMainMenu() {
  console.log(mainMenu);
  rl.question('Please enter your choice: ', (choice) => {
    handleMainMenuChoice(choice);
  });
}

function handleMainMenuChoice(choice) {
  switch (choice) {
    case '1':
      displayEmployeeView();
      break;
    case '2':
      displayRoleView();
      break;
    case '3':
      displayDepartmentView();
      break;
    case '4':
      displayAddEmployee();
      break;
    case '5':
      displayAddRole();
      break;
    case '6':
      displayAddDepartment();
      break;
    case '7':
      updateEmployeeRole();
      break;
    case '9':
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMainMenu();
      break;
  }
}

function displayEmployeeView() {
  console.log(viewEmployees);
  employee.getAllEmployees()
    .then((employees) => {
      console.log(employees);
      displayMainMenu();
    })
    .catch((error) => {
      console.error('Error:', error);
      displayMainMenu();
    });
}

function displayRoleView() {
  console.log(viewRoles);
  employee.getAllRoles()
    .then((roles) => {
      console.log(roles);
      displayMainMenu();
    })
    .catch((error) => {
      console.error('Error:', error);
      displayMainMenu();
    });
}

function displayDepartmentView() {
  console.log(viewDepartments);
  employee.getAllDepartments()
    .then((departments) => {
      console.log(departments);
      displayMainMenu();
    })
    .catch((error) => {
      console.error('Error:', error);
      displayMainMenu();
    });
}

function displayAddEmployee() {
  console.log(addEmployee);
  rl.question('Enter the first name: ', (firstName) => {
    rl.question('Enter the last name: ', (lastName) => {
      rl.question('Enter the role ID: ', (roleId) => {
        employee.addEmployee(firstName, lastName, roleId)
          .then((result) => {
            console.log(result);
            displayMainMenu();
          })
          .catch((error) => {
            console.error('Error:', error);
            displayMainMenu();
          });
      });
    });
  });
}

function displayAddRole() {
  console.log(addRole);
  rl.question('Enter the role name: ', (roleName) => {
    employee.addRole(roleName)
      .then((result) => {
        console.log(result);
        displayMainMenu();
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMainMenu();
      });
  });
}

function displayAddDepartment() {
  console.log(addDepartment);
  rl.question('Enter the department name: ', (departmentName) => {
    employee.addDepartment(departmentName)
      .then((result) => {
        console.log(result);
        displayMainMenu();
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMainMenu();
      });
  });
}

function updateEmployeeRole() {
  console.log(updateEmployeeRole);
  rl.question('Enter the employee ID: ', (employeeId) => {
    rl.question('Enter the new role ID: ', (roleId) => {
      employee.updateEmployeeRole(employeeId, roleId)
        .then((result) => {
          console.log(result);
          displayMainMenu();
        })
        .catch((error) => {
          console.error('Error:', error);
          displayMainMenu();
        });
    });
  });
}

displayMainMenu();