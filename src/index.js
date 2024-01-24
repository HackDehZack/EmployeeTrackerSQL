const inquirer = require("inquirer");
const db = require("../db/connection");
const { table } = require("console");

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

const getDepartments = async () => {
  return await executeQuery("SELECT id, name FROM department");
};

const getRoles = async () => {
  return await executeQuery(
    "SELECT role.id, role.title, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id"
  );
};

const getEmployees = async () => {
  return await executeQuery(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, department.name AS department_title, role.salary AS role_salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id"
  );
};

const viewAllDepartments = async () => {
  const departments = await getDepartments();
  if (departments) {
    console.log(table(departments));
  }
  start();
};

const viewAllRoles = async () => {
  const roles = await getRoles();
  if (roles) {
    console.log(table(roles));
  }
  start();
};

const viewAllEmployees = async () => {
  const employees = await getEmployees();
  if (employees) {
    console.log(table(employees));
  }
  start();
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:"
    }
  ]);

  try {
    await db.query("INSERT INTO department SET ?", {
      name: answers.name
    });
    console.log("Department added!");
  } catch (error) {
    console.error(error);
  }
  start();
};

const addRole = async () => {
  const departments = await getDepartments();
  if (!departments) return start();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:"
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:"
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department for the role:",
      choices: departments.map(department => ({
        name: department.name,
        value: department.id
      }))
    }
  ]);

  try {
    await db.query("INSERT INTO role SET ?", {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department_id
    });
    console.log("Role added!");
  } catch (error) {
    console.error(error);
  }
  start();
};

const addEmployee = async () => {
  const roles = await getRoles();
  const employees = await getEmployees();
  if (!(roles && employees)) return start();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:"
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:"
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the employee's role:",
      choices: roles.map(role => ({
        name: role.title,
        value: role.id
      }))
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select the employee's manager:",
      choices: employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))
    }
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

const updateEmployeeRole = async () => {
  const employees = await getEmployees();
  const roles = await getRoles();
  if (!(employees && roles)) return start();

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select the employee to update:",
      choices: employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the employee's new role:",
      choices: roles.map(role => ({
        name: role.title,
        value: role.id
      }))
    }
  ]);

  try {
    await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.employee_id]);
    console.log("Employee role updated!");
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
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
      ]
    });

    switch (action) {
      case "View all departments":
        viewAllDepartments();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "Exit":
        console.log("Goodbye!");
        process.exit(0);
    }
  } catch (error) {
    console.error(error);
    start();
  }
};

// Start the application
start();

// Export functions for testing
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  start
};