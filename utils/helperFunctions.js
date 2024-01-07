// Import the required dependencies
const mysql = require('mysql2');
const util = require('util');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employeetrackerforbadbosses',
  connectionLimit: 10,
});

// connectionLimit: 10 sets the maximum number of connections to 10, aka the maximum number of queries that can be made at once!


// Promisify the pool query method
const query = util.promisify(pool.query).bind(pool);


//? What is the difference between async and await?
//^ Async is a keyword that is used to declare a function as asynchronous, which means that the function will return a promise.
//^ Await is a keyword that is used to wait for the promise to resolve or reject. It can only be used inside an async function.

// Function to view all departments
async function viewAllDepartments() {
  // Implement the query to retrieve all departments from the database
  const departments = await query('SELECT * FROM departments');
  return departments;
}

// Function to view all roles
async function viewAllRoles() {
  // Implement the query to retrieve all roles from the database
  const roles = await query('SELECT * FROM roles');
  return roles;
}

// Function to view all employees
async function viewAllEmployees() {
  // Implement the query to retrieve all employees from the database
  const employees = await query('SELECT * FROM employees');
  return employees;
}

// Function to add a department
async function addDepartment(departmentName) {
  // Implement the query to add a new department to the database
  const result = await query('INSERT INTO departments (name) VALUES (?)', [departmentName]);
  return result;
}

// Function to add a role
async function addRole(roleName, salary, departmentId) {
  // Implement the query to add a new role to the database
  const result = await query('INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)', [roleName, salary, departmentId]);
  return result;
}

// Function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  // Implement the query to add a new employee to the database
  const result = await query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  return result;
}

// Function to update my role
async function updateEmployeeRole(employeeId, roleId) {
  // Implement the query to update my role in the database
  const result = await query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  return result;
}

// Export my helper functions aka the functions that will be used in my index.js file etc
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};