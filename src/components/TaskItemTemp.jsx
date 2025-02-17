import { deleteTask } from "../api/taskService";
import "../styles/styles.css";

const TaskItem = ({ task, refreshTasks, setSelectedTask }) => {
  const handleDelete = async () => {
    await deleteTask(task.id);
    refreshTasks();
  };

  return (
    <li className="task-item">
      <span>{task.title} - {task.status} (Due: {task.due_date})</span>
      <div>
        <button onClick={() => setSelectedTask(task)}>Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
