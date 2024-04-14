import { useEffect } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx";

function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return (<h1>No tasks.</h1>);

  return (
    <div className="grid grid-cols-3 gap-2">
      {
      tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))
      }
    </div>
  )
}

export default TasksPage;