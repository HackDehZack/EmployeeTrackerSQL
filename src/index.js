const express = require('express');
const Employee = require('../models/employee');
const mainMenu = require('../views/mainMenu');
const readlineSync = require('readline-sync');
const employeeRoutes = require('../routes/employeeRoutes.js');
const roleRoutes = require('../routes/roleRoutes.js');
const departmentRoutes = require('../routes/departmentRoutes.js');

function promptMainMenu() {
  console.log(mainMenu);

  const choice = readlineSync.question('Please enter your choice: ');
  handleMainMenuChoice(choice);
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
  const departmentName = readlineSync.question('Enter the name of the department: ');
  Employee.addDepartment(departmentName)
    .then(() => {
      console.log('Department added successfully.');
      promptMainMenu();
    })
    .catch((error) => {
      console.error('An error occurred while adding a department:', error);
      promptMainMenu();
    });
}

function promptAddRole() {
  const roleName = readlineSync.question('Enter the name of the role: ');
  const salary = readlineSync.question('Enter the salary for the role: ');
  const departmentId = readlineSync.question('Enter the department ID for the role: ');
  Employee.addRole(roleName, salary, departmentId)
    .then(() => {
      console.log('Role added successfully.');
      promptMainMenu();
    })
    .catch((error) => {
      console.error('An error occurred while adding a role:', error);
      promptMainMenu();
    });
}

function promptAddEmployee() {
  const firstName = readlineSync.question("Enter the employee's first name: ");
  const lastName = readlineSync.question("Enter the employee's last name: ");
  const roleId = readlineSync.question('Enter the role ID for the employee: ');
  const managerId = readlineSync.question('Enter the manager ID for the employee: ');
  Employee.addEmployee(firstName, lastName, roleId, managerId)
    .then(() => {
      console.log('Employee added successfully.');
      promptMainMenu();
    })
    .catch((error) => {
      console.error('An error occurred while adding an employee:', error);
      promptMainMenu();
    });
}

function promptUpdateEmployeeRole() {
  const employeeId = readlineSync.question('Enter the ID of the employee to update: ');
  const roleId = readlineSync.question('Enter the new role ID for the employee: ');
  Employee.updateEmployeeRole(employeeId, roleId)
    .then(() => {
      console.log('Employee role updated successfully.');
      promptMainMenu();
    })
    .catch((error) => {
      console.error('An error occurred while updating employee role:', error);
      promptMainMenu();
    });
}

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);
app.use('/departments', departmentRoutes);