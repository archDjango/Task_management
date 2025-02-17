const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change this to your MySQL username
  password: 'root',  // Change this to your MySQL password
  database: 'task_management'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// API Endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add new task
app.post('/tasks', (req, res) => {
  const { title, description, status, due_date } = req.body;
  const query = 'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)';
  
  db.query(query, [title, description, status, due_date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newTask = { id: result.insertId, title, description, status, due_date };
    res.status(201).json(newTask); // Return the newly created task
  });
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?';
  
  db.query(query, [title, description, status, due_date, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task updated successfully' });
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
