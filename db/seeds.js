// WHat is mY pUrPose
// To seed the database with data!
//oh my god-

// Import necessary modules and establish a connection to the database
const connection = require('./connection.js');
const mysql = require('mysql2');

// Create the employees table
const sql1 = `CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    department VARCHAR(255) NOT NULL,
    manager VARCHAR(255) NOT NULL,
    FOREIGN KEY (department) REFERENCES departments(id),
    FOREIGN KEY (manager) REFERENCES employees(id)
)`;

// Create the departments table
const sql2 = `CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`;

// Create the roles table
const sql3 = `CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary INT NOT NULL
)`;

// Insert the employee data into the database
const employees = [
    { name: 'John Doe', position: 'Manager' },
    { name: 'Jane Smith', position: 'Developer' },
    { name: 'Mike Johnson', position: 'Designer' },
];

employees.forEach((employee) => {
    const sql = 'INSERT INTO employees (name, position) VALUES (?, ?)';
    connection.query(sql, [employee.name, employee.position], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Inserted employee ${employee.name} into the database.`);
    });
});

// Insert the department data into the database
const departments = [
    { name: 'Sales' },
    { name: 'Marketing' },
    { name: 'Engineering' },
];

departments.forEach((department) => {
    const sql = 'INSERT INTO departments (name) VALUES (?)';
    connection.query(sql, [department.name], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Inserted department ${department.name} into the database.`);
    });
});

// Insert the role data into the database
const roles = [
    { title: 'Manager', salary: 100000 },
    { title: 'Developer', salary: 80000 },
    { title: 'Designer', salary: 70000 },
];

roles.forEach((role) => {
    const sql = 'INSERT INTO roles (title, salary) VALUES (?, ?)';
    connection.query(sql, [role.title, role.salary], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Inserted role ${role.title} into the database.`);
    });
});

// Close the database connection
connection.end();