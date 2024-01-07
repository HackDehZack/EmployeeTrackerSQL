const connection = require('../db/connection');

// Function to display all employees
function displayEmployees() {
  // Fetch all employees from the database
  Employee.findAll()
    .then((employees) => {
      console.log('Employee List:');
      employees.forEach((employee) => {
        console.log(
          `ID: ${employee.id}, Name: ${employee.firstName} ${employee.lastName}, Role: ${employee.role}, Department: ${employee.department}`
        );
      });
      console.log('---------------------------');
    })
    .catch((error) => {
      console.error('Error fetching employees:', error);
    });
}

module.exports = { displayEmployees };