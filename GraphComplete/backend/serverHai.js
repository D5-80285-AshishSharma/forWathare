// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // MySQL host
  user: 'root', // MySQL username
  password: 'manager', // MySQL password
  database: 'wathareji' // MySQL database name
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Create an Express application
const app = express();
app.use(cors()); //use cors

// Define a route to retrieve data from MySQL
app.get('/data', (req, res) => {
  // Perform a SELECT query to retrieve data from a table
  connection.query('  select ts ,machine_status,vibration from purabase order by ts ;', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the retrieved data as JSON response
    res.json(results);
  });
});

// Start the server
const port = 4000; // Port number to run the server on
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
