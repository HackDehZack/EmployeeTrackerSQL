##EmployeeTrackerSQL
Welcome to the Employee Tracker SQL repository! This powerful content management system is designed to streamline the process of managing employee data stored in a MySQL database. With its user-friendly interface and adherence to the MVC architecture, the Employee Tracker SQL offers an efficient and organized solution for viewing, adding, and updating department, role, and employee data.

Link to demonstration: 




Prerequisites
Before getting started with the Employee Tracker SQL, please ensure that you have the following prerequisites in place:

Node.js: Make sure you have Node.js installed on your system. If not, you can download it from the official Node.js website.

MySQL2: The Employee Tracker SQL relies on a MySQL database to store and retrieve employee data. Ensure that you have MySQL installed on your machine. If not, you can download it from the official MySQL website.

Dependencies: The Employee Tracker SQL has a few dependencies listed in its package.json file. To install these dependencies, navigate to the project directory in your terminal and run the command npm install.

Setup
To get started with the Employee Tracker SQL, follow these steps:

Clone the Repository: Begin by cloning the Employee Tracker SQL repository to your local machine. You can do this by running the following command in your terminal:
Copy
git clone git@github.com:HackDehZack/EmployeeTrackerSQL.git
Install Dependencies: With the repository cloned, navigate to the project directory in your terminal and run the command npm install to install the required dependencies.

Create .env File: In the project directory, create a new file named .env. Inside this file, add your MySQL database credentials in the following format:

Copy
DB_USER=root
DB_PW=password
Replace root with your MySQL username and password with your MySQL password.

Seed the Database: To populate the MySQL database with sample data, run the command npm run seeds in your terminal. This will ensure that you have some initial data to work with.

Launch the App: Finally, to start the Employee Tracker SQL, run the command npm start in your terminal. This will launch the CLI app and present you with a menu of options to interact with the employee data.

Usage
Once you have launched the Employee Tracker SQL, you will be presented with a menu of options to manage your employee data. Here are some key functionalities:

View Data: You can choose to view data related to departments, roles, and employees. This will display the existing records in a clear and organized manner.

Add Records: If you need to add new departments, roles, or employees, the Employee Tracker SQL allows you to easily do so. Simply follow the prompts and provide the necessary information.

Update Roles: As your organization evolves, you may need to update the roles of your employees. The Employee Tracker SQL provides a seamless way to update roles, ensuring that your data remains accurate.

Manage Employees: With the Employee Tracker SQL, you can efficiently manage your employees by assigning them to different roles and departments. This allows you to keep track of your workforce and their responsibilities.

Get Feedback: Every action you take within the Employee Tracker SQL will provide you with feedback. Whether it's a successful record addition or an error message, you will receive clear feedback to keep you informed.

License
This project is licensed under the MIT License. Please refer to the LICENSE file for more details.

Contact
If you have any questions, suggestions, or issues regarding the Employee Tracker SQL, feel free to reach out to the repository owner at zackseriousemail@gmail.com
