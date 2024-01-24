-- Active: 1706132468299@@127.0.0.1@3306@employeetrackersql
-- Create departments table
CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create roles table
CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Insert departments
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 95000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 80000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 3, 2);
