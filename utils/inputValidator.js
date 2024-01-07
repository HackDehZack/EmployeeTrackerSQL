// Define the inputValidator object
const inputValidator = {
    // Function to validate the user input for adding a department
    validateAddDepartmentInput: function (name) {
      if (!name) {
        return 'Department name is required.';
      }
      return true;
    },
  
    // Function to validate the user input for adding a role
    validateAddRoleInput: function (name, salary, department) {
      if (!name) {
        return 'Role name is required.';
      }
      if (!salary || isNaN(salary)) {
        return 'Salary must be a number.';
      }
      if (!department) {
        return 'Department is required.';
      }
      return true;
    },
  
    // Function to validate the user input for adding an employee
    validateAddEmployeeInput: function (firstName, lastName, role, manager) {
      if (!firstName) {
        return 'First name is required.';
      }
      if (!lastName) {
        return 'Last name is required.';
      }
      if (!role) {
        return 'Role is required.';
      }
      if (!manager) {
        return 'Manager is required.';
      }
      return true;
    },
  
    // Function to validate the user input for updating an employee role
    validateUpdateEmployeeRoleInput: function (employee, role) {
      if (!employee) {
        return 'Employee is required.';
      }
      if (!role) {
        return 'Role is required.';
      }
      return true;
    },
  };
  
  // Export the inputValidator object
  module.exports = inputValidator;