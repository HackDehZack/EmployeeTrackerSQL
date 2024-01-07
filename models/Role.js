// Import the necessary modules
const connection = require('../db/connection');
const queries = require('../db/queries');

// Create a Role class to handle role-related operations
class Role {
  // Method to get all the roles from the database
  async getAllRoles() {
    try {
      // Use the special module called "queries" to get all the roles
      const roles = await queries.getAllRoles();
      // Return the list of roles we received
      return roles;
    } catch (error) {
      // If something goes wrong while getting the roles, show an error message
      console.error(error);
      // Also, throw the error so that it can be handled by the code that called this method
      throw error;
    }
  }

  // Method to add a new role to the database
  async addRole(title, salary, departmentId) {
    try {
      // Use the "queries" module to add the new role with its title, salary, and department ID
      const result = await queries.addRole(title, salary, departmentId);
      // Return the result of adding the role
      return result;
    } catch (error) {
      // If there's an error while adding the role, show an error message
      console.error(error);
      // Also, throw the error so that it can be handled by the code that called this method
      throw error;
    }
  }

  // Method to update a role in the database
  async updateRole(id, title, salary, departmentId) {
    try {
      // Use the "queries" module to update the role with the provided ID, title, salary, and department ID
      const result = await queries.updateRole(id, title, salary, departmentId);
      // Return the result of updating the role
      return result;
    } catch (error) {
      // If there's an error while updating the role, show an error message
      console.error(error);
      // Also, throw the error so that it can be handled by the code that called this method
      throw error;
    }
  }
}

// Export the Role class so that it can be used by other parts of the application
module.exports = Role;