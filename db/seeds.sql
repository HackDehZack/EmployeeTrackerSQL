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

