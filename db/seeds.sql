INSERT INTO department (name) 
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Superman', 'Clark Kent', 1, NULL),
('Spiderman', 'Peter Parker', 2, 1),
('Wonder Woman', 'Diana Prince', 3, 1),
('Batman', 'Bruce Wayne', 4, 3),
('Flash', 'Barry Allen', 5, 3),
('Black Widow', 'Natasha Romanoff', 6, 4),
('Captain Marvel', 'Carol Danvers', 7, 6);
