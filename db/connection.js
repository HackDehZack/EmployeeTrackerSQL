// Require the dotenv package to use environment variables
require('dotenv').config();

// Import necessary modules from Sequelize
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

// Create a new Sequelize instance with database connection details
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name from environment variables
    process.env.DB_USER,     // Database user from environment variables
    process.env.DB_PW,       // Database password from environment variables
    {
        host: 'localhost',    // Database host
        dialect: 'mysql',     // Dialect (type) of the database
        port: 3306             // Database port
    }
);

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;