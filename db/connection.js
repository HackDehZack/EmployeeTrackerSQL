
const mysql = require('mysql2');

// Create the database connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password',
  database: 'employeetrackersql'
});



// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database tehe!');
});



// Export the connection object
module.exports = connection;