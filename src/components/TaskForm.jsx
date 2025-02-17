import { useState, useEffect } from "react";
import { addTask, updateTask } from "../api/taskService";
import "../styles/styles.css";

const TaskForm = ({ selectedTask, refreshTasks, clearSelection }) => {
  const [task, setTask] = useState({ title: "", description: "", status: "Pending", due_date: "" });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.id) {
      await updateTask(task.id, task);
    } else {
      await addTask(task);
    }
    refreshTasks();
    clearSelection();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2>{task.id ? "Edit Task" : "Add Task"}</h2>
      <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange}></textarea>
      <select name="status" value={task.status} onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required />
      <button type="submit">{task.id ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
