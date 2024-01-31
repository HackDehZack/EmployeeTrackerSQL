const inquirer = require("inquirer");
const db = require("./db/connection");



// Function to view all employees
const viewAllEmployees = async () => {
  try {
    // SQL query to retrieve employee details with additional information
    const query = `
      SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id,
             r.title AS role_title, r.salary AS role_salary,
             m.first_name AS manager_first_name, m.last_name AS manager_last_name,
             d.name AS department_title
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
    `;



    // Execute the query
    const employees = await db.query(query, {
      type: db.QueryTypes.SELECT,
    });

// above was pain in rear, refer to documentation if you're working on a similar project and need assistance... or email me!


    // Format the retrieved employees data for better display
    const formattedEmployees = employees.map((employee) => {
      return {
        ID: employee.id,
        First_Name: employee.first_name,
        Last_Name: employee.last_name,
        Title: employee.role_title,
        Department: employee.department_title,
        Salary: employee.role_salary,
        Manager: `${employee.manager_first_name} ${employee.manager_last_name}`,
      };
    });




    // Display the formatted employee data in a table
    console.table(formattedEmployees);
    start();
  } catch (error) {
    console.log(error);
    start();
  }
};




// Function to add a new employee
const addEmployee = async () => {
  try {
    // Retrieve roles from the database
    const roles = await db.query("SELECT * FROM role");

    // Prompt the user for employee details
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee's first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter employee's last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: roles[0].map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          }),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: async () => {
            const employees = await db.query("SELECT * FROM employee");

            return employees[0].map((employee) => {
              return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              };
            });
          },
        },
      ])
      .then(async (answers) => {
        try {
          // Insert the new employee into the database
          await db.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            {
              replacements: [
                answers.first_name,
                answers.last_name,
                answers.role_id,
                answers.manager_id,
              ],
              type: db.QueryTypes.INSERT,
            }
          );
          console.log("Employee added!");
          start();
          
        } catch (error) {
          console.log(error);
          start();
        }
      });
  } catch (error) {
    console.log(error);
    start();
  }
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
  // Prompt the user to select an employee and a new role
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Which employee's role would you like to update?",
        choices: async () => {
          const employees = await db.query("SELECT * FROM employee");

          return employees[0].map((employee) => {
            return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            };
          });
        },
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role do you want to assign to the selected employee?",
        choices: async () => {
          const roles = await db.query("SELECT * FROM role");

          return roles[0].map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
        },
      },
    ])
    .then(async (answers) => {
      try {
        // Retrieve the employee's last name
        const [employee] = await db.query(
          "SELECT last_name FROM employee WHERE id = ?",
          {
            replacements: [answers.employee_id],
            type: db.QueryTypes.SELECT,
          }
        );

        // Check if the employee exists
        if (!employee) {
          console.log("Employee not found");
          return start();
        }

        // Update the employee's role in the database
        await db.query("UPDATE employee SET role_id = ? WHERE id = ?", {
          replacements: [answers.role_id, answers.employee_id],
          type: db.QueryTypes.UPDATE,
        });

        console.log(`${employee.last_name}'s role updated!`);
        start();
      } catch (error) {
        console.log(error);
        start();
      }
    });
};

// Function to view all roles
const viewAllRoles = async () => {
  try {
    // SQL query to retrieve all roles with additional information
    const query = `
      SELECT r.id AS ID, r.title AS Title, r.salary AS Salary, d.name AS Department
      FROM role r
      LEFT JOIN department d ON r.department_id = d.id
    `;

    // Execute the query
    const [roles] = await db.query(query);

    // Format the retrieved roles data for better display
    const formattedRoles = roles.map((role) => {
      return {
        ID: role.ID,
        Title: role.Title,
        Salary: role.Salary,
        Department: role.Department,
      };
    });

    console.table(formattedRoles);
    start();
  } catch (error) {
    console.log(error);
    start();
  }
};

// Function to add a new role
const addRole = async () => {
  try {
    // Retrieve departments from the database
    const departments = await db.query("SELECT * FROM department");

    // Prompt the user for role details
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter role salary:",
      },
      {
        type: "list",
        name: "department_id",
        message:
          "Which department does this role belong to? (Enter department ID):",
        choices: departments[0].map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
    ]);

    // Insert the new role into the database
    await db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      {
        replacements: [answers.title, answers.salary, answers.department_id],
        type: db.QueryTypes.INSERT,
      }
    );

    console.log("Role added!");
    start();
  } catch (error) {
    console.log(error);
    start();
  }
};

// Function to view all departments
const viewAllDepartments = async () => {
  try {
    // Retrieve all departments from the database
    const [departments, metadata] = await db.query("SELECT * FROM department");

    // Remove duplicates based on the 'id' field
    const uniqueDepartments = Array.from(
      new Set(departments.map((d) => d.id))
    ).map((id) => {
      return departments.find((d) => d.id === id);
    });

    // Display the unique department data in a table
    console.table(uniqueDepartments);
    start();
  } catch (error) {
    console.log(error);
    start();
  }
};

// Function to add a new department
const addDepartment = async () => {
  try {
    // Retrieve existing departments from the database
    const [existingDepartments, metadata] = await db.query(
      "SELECT * FROM department"
    );

    // Prompt the user for department details
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter department name:",
        },
      ])
      .then(async (answers) => {
        try {
          // Check if the department with the same name already exists
          const departmentExists = existingDepartments.some(
            (dep) => dep.name === answers.name
          );

          // If department exists, inform the user and exit
          if (departmentExists) {
            console.log("Department with the same name already exists");
            return start();
          }

          // Insert the new department into the database
          await db.query("INSERT INTO department (name) VALUES (?)", {
            replacements: [answers.name],
            type: db.QueryTypes.INSERT,
          });

          console.log("Department added!");
          start();
        } catch (error) {
          console.log(error);
          start();
        }
      });
  } catch (error) {
    console.log(error);
    start();
  }
};

// Function to start the application and prompt user for actions
const start = () => {
  console.log("Welcome to the Employee Tracker!");
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          console.log("Goodbye Boss!");
          process.exit();
          break;
      }
    })
    .catch((error) => {
      console.log(error);
      return start(); // Ensure you return the recursive call
    });
};

// Start the application
start();

// Export functions for testing
module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
  start,
};
