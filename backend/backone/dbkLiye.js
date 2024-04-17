const fs = require('fs');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'wathareji'
});

// Read JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log('Parsed JSON data:', jsonData); // Debug statement

    const tableName = 'try_table';

    // Create the table if it doesn't exist
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ts VARCHAR(255),
      machine_status VARCHAR(255),
      vibration VARCHAR(255)
      -- Add more fields as needed
    )`;

    connection.query(createTableQuery, (err, results, fields) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }

      console.log('Table created successfully');

      // Insert data into the table
      const insertQuery = `INSERT INTO ${tableName} (ts, machine_status, vibration) VALUES ?`;
      console.log('Insert query:', insertQuery); // Debug statement
      
      const values = jsonData.map(item => [
        item.ts,
        item.machine_status,
        item.vibration
        // Add more values as needed
      ]);
      
      console.log('Data to insert:', values); // Debug statement

      connection.query(insertQuery, [values], (err, results, fields) => {
        if (err) {
          console.error('Error inserting data:', err);
          return;
        }

        console.log('Data inserted successfully');
        console.log('Insertion results:', results); // Debug statement
        connection.end();
      });
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
