// Import necessary modules and establish a connection to the database
const connection = require('./connection.js')
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


// Define the employee data
const employees = [
    { name: 'John Doe', position: 'Manager' },
    { name: 'Jane Smith', position: 'Developer' },
    { name: 'Mike Johnson', position: 'Designer' },
];

// Insert the employee data into the database
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

// Close the database connection
connection.end();