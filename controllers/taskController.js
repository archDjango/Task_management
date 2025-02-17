const db = require("../db");

// Get all tasks
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Add a new task
exports.addTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const sql = "INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, status, due_date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

// Update task
exports.updateTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const sql = "UPDATE tasks SET title=?, description=?, status=?, due_date=? WHERE id=?";
  db.query(sql, [title, description, status, due_date, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task updated successfully" });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const sql = "DELETE FROM tasks WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted successfully" });
  });
};
