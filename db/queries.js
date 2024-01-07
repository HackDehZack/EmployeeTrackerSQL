const connection = require('./connection');

// Function to retrieve all departments from the database
function getAllDepartments() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM department', (error, departments) => {
      if (error) {
        reject(error);
      } else {
        resolve(departments);
      }
    });
  });
}

// Function to add a new department to the database
function addDepartment(name) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO department SET ?';
    const departmentData = { name };

    connection.query(query, departmentData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Function to update a department in the database
function updateDepartment(id, name) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE department SET name = ? WHERE id = ?';
    const departmentData = [name, id];

    connection.query(query, departmentData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Export the functions for other modules to use
module.exports = {
  getAllDepartments,
  addDepartment,
  updateDepartment,
};