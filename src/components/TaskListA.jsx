import TaskItem from "./TaskItemTemp";
import "../styles/styles.css";

const TaskList = ({ tasks, refreshTasks, setSelectedTask }) => {
  return (
    <div className="container">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} setSelectedTask={setSelectedTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
