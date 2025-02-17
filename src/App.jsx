import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending', due_date: '' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    // Fetch tasks on component mount
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        const addedTask = response.data;
        setTasks([...tasks, addedTask]);
        setNewTask({ title: '', description: '', status: 'Pending', due_date: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/tasks/${editTask.id}`, editTask)
      .then(() => {
        const updatedTasks = tasks.map(task => task.id === editTask.id ? editTask : task);
        setTasks(updatedTasks);
        setEditTask(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleStatusChange = (id, status) => {
    const updatedTask = tasks.find(task => task.id === id);
    updatedTask.status = status;
    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      })
      .catch(error => console.error('Error updating task status:', error));
  };

  return (
    <div className="container">
      <h1>Task Management System</h1>
      <div>
        <h2>Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
          <textarea placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required />
          <input type="date" value={newTask.due_date} onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} required />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>{task.due_date}</td>
              <td>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTask && (
        <div>
          <h2>Edit Task</h2>
          <form onSubmit={handleUpdateTask}>
            <input type="text" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} required />
            <textarea value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} required />
            <input type="date" value={editTask.due_date} onChange={(e) => setEditTask({ ...editTask, due_date: e.target.value })} required />
            <button type="submit">Update Task</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
