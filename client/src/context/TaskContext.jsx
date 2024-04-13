import { useState } from "react";
import { createContext, useContext } from "react";
import { getTasksRequest, createTaskRequest, getTaskRequest, updateTaskRequest, deleteTaskRequest } from "../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);  
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  // const getTask = async (task) => {};

  return (
    <TaskContext.Provider value={{
      tasks,
      getTasks,
      createTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}