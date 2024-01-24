const inquirer = require("inquirer");
const db = require("../db/connection");

const executeQuery = async (query, replacements = []) => {
  try {
    return await db.query(query, {
      replacements: replacements,
      type: db.QueryTypes.SELECT
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getRoles = async () => {
  return await executeQuery("SELECT id, title FROM role");
};

const getEmployees = async () => {
  return await executeQuery("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee");
};

const formatEmployeeData = (employees) => {
  return employees.map(employee => ({
    ID: employee.id,
    First_Name: employee.first_name,
    Last_Name: employee.last_name,
    Title: employee.role_title,
    Department: employee.department_title,
    Salary: employee.role_salary,
    Manager: `${employee.manager_first_name} ${employee.manager_last_name}`
  }));
};

const viewAllEmployees = async () => {
  // const query = `...`; 
  const employees = await executeQuery(query);
  if (employees) {
    console.table(formatEmployeeData(employees));
  }
  start();
};

const addEmployee = async () => {
  const roles = await getRoles();
  const employees = await getEmployees();
  if (!(roles && employees)) return start();
  
  const answers = await inquirer.prompt([
  ]);

  try {
    await db.query("INSERT INTO employee SET ?", {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_id: answers.role_id,
      manager_id: answers.manager_id
    });
    console.log("Employee added!");
  } catch (error) {
    console.error(error);
  }
  start();
};


const start = async () => {
  console.log("Welcome to the Employee Tracker!");
  try {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
      ]
    });
    await action();
  } catch (error) {
    console.error(error);
    start();
  }
};

// Start the application
start();

// Export functions for testing
module.exports = {
  viewAllEmployees,
  addEmployee,
  start
};