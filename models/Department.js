// Import the necessary modules
const connection = require('../db/connection');
const queries = require('../db/queries');


// create the Department class
class Department {
  // Method to retrieve all departments from the database
  async getAllDepartments() {
    try {
      const departments = await queries.getAllDepartments();
      return departments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  // Method to add a new department to the database
  async addDepartment(name) {
    try {
      const result = await queries.addDepartment(name);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  // Method to update a department in the database
  async updateDepartment(id, name) {
    try {
      const result = await queries.updateDepartment(id, name);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Export the Department class
module.exports = Department;