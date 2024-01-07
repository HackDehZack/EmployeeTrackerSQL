const express = require('express');
const Employee = require('../models/employee');
const mainMenu = require('../views/mainMenu');
const readline = require('readline');
const employeeRoutes = require('./routes/employeeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptMainMenu() {
  console.log(mainMenu);

  rl.question('Please enter your choice: ', (choice) => {
    handleMainMenuChoice(choice);
  });
}

function handleMainMenuChoice(choice) {
  switch (choice) {
    case '1':
      // View all departments
      Employee.getAllDepartments()
        .then((departments) => {
          console.table(departments);
          promptMainMenu();
        })
        .catch((error) => {
          console.error('An error occurred while retrieving departments:', error);
          promptMainMenu();
        });
      break;
    case '2':
      // View all roles
      Employee.getAllRoles()
        .then((roles) => {
          console.table(roles);
          promptMainMenu();
        })
        .catch((error) => {
          console.error('An error occurred while retrieving roles:', error);
          promptMainMenu();
        });
      break;
    case '3':
      // View all employees
      Employee.getAllEmployees()
        .then((employees) => {
          console.table(employees);
          promptMainMenu();
        })
        .catch((error) => {
          console.error('An error occurred while retrieving employees:', error);
          promptMainMenu();
        });
      break;
    case '4':
      // Add a department
      promptAddDepartment();
      break;
    case '5':
      // Add a role
      promptAddRole();
      break;
    case '6':
      // Add an employee
      promptAddEmployee();
      break;
    case '7':
      // Update an employee role
      promptUpdateEmployeeRole();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      promptMainMenu();
      break;
  }
}

function promptAddDepartment() {
  rl.question('Enter the name of the department: ', (departmentName) => {
    Employee.addDepartment(departmentName)
      .then(() => {
        console.log('Department added successfully.');
        promptMainMenu();
      })
      .catch((error) => {
        console.error('An error occurred while adding a department:', error);
        promptMainMenu();
      });
  });
}
function promptAddRole() {
  rl.question('Enter the name of the role: ', (roleName) => {
    rl.question('Enter the salary for the role: ', (salary) => {
      rl.question('Enter the department ID for the role: ', (departmentId) => {
        Employee.addRole(roleName, salary, departmentId)
          .then(() => {
            console.log('Role added successfully.');
            promptMainMenu();
          })
          .catch((error) => {
            console.error('An error occurred while adding a role:', error);
            promptMainMenu();
          });
      });
    });
  });
}

function promptAddEmployee() {
  rl.question('Enter the employee\'s first name: ', (firstName) => {
    rl.question('Enter the employee\'s last name: ', (lastName) => {
      rl.question('Enter the role ID for the employee: ', (roleId) => {
        rl.question('Enter the manager ID for the employee: ', (managerId) => {
          Employee.addEmployee(firstName, lastName, roleId, managerId)
            .then(() => {
              console.log('Employee added successfully.');
              promptMainMenu();
            })
            .catch((error) => {
              console.error('An error occurred while adding an employee:', error);
              promptMainMenu();
            });
        });
      });
    });
  });
}

function promptUpdateEmployeeRole() {
  rl.question('Enter the ID of the employee to update: ', (employeeId) => {
    rl.question('Enter the new role ID for the employee: ', (roleId) => {
      Employee.updateEmployeeRole(employeeId, roleId)
        .then(() => {
          console.log('Employee role updated successfully.');
          promptMainMenu();
        })
        .catch((error) => {
          console.error('An error occurred while updating employee role:', error);
          promptMainMenu();
        });
    });
  });
}




//server localhost 
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${3000}`);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);
app.use('/departments', departmentRoutes);