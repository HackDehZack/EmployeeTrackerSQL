// Necessary modules (use require statements)
const inquirer = require('inquirer');
const Employee = require('../models/employee');

// Function to display the main menu options
async function displayMainMenu() {
  let exit = false;

  while (!exit) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add an employee', 'Update an employee role', 'Exit'],
      },
    ]);

    // Implement the logic for each menu option here
    switch (answers.menuOption) {
      case 'View all employees':
        // Call the method to view all employees
        await viewAllEmployees();
        break;
      case 'Add an employee':
        // Call the method to add an employee
        await addEmployee();
        break;
      case 'Update an employee role':
        // Call the method to update an employee's role
        await updateEmployeeRole();
        break;
      case 'Exit':
        // Exit the application
        console.log('Goodbye!');
        exit = true;
        break;
      default:
        console.log('Invalid option selected.');
        break;
    }
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    // Create a new instance of the Employee class
    const employee = new Employee();
    // Call the getAllEmployees method to retrieve all employees
    const employees = await employee.getAllEmployees();
    // Display the employees
    console.log(employees);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Function to add an employee
async function addEmployee() {
  try {
    // Create a new instance of the Employee class
    const employee = new Employee();

    // Prompt the user for employee details
    const employeeDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID:",
      },
    ]);

    // Call the addEmployee method to add the employee
    await employee.addEmployee(
      employeeDetails.firstName,
      employeeDetails.lastName,
      employeeDetails.roleId,
      employeeDetails.managerId
    );

    console.log('Employee added successfully.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Function to update an employee's role
async function updateEmployeeRole() {
  try {
    // Create a new instance of the Employee class
    const employee = new Employee();

    // Prompt the user for employee and role details
    const employeeRoleDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: "Enter the employee's ID:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the new role ID:",
      },
    ]);

    // Call the updateEmployeeRole method to update the employee's role
    await employee.updateEmployeeRole(employeeRoleDetails.employeeId, employeeRoleDetails.roleId);

    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Call the function to display the main menu
displayMainMenu();