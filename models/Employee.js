// Necessary modules (use require statements)
const connection = require('../db/connection');
const queries = require('../db/queries');

class Employee {
  // Method to retrieve all employees from the database
  async getAllEmployees() {
    try {
      // Implement the SQL query here using the queries module
      const employees = await queries.getAllEmployees();
      return employees;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Method to add a new employee to the database
  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      // Implement the SQL query here using the queries module
      const result = await queries.addEmployee(firstName, lastName, roleId, managerId);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Method to update an employee's role in the database
  async updateEmployeeRole(employeeId, roleId) {
    try {
      // Implement the SQL query here using the queries module
      const result = await queries.updateEmployeeRole(employeeId, roleId);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Method to update an employee's manager in the database
  async updateEmployeeManager(employeeId, managerId) {
    try {
      // Implement the SQL query here using the queries module
      const result = await queries.updateEmployeeManager(employeeId, managerId);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Employee;