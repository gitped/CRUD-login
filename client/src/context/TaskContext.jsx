import { useState } from "react";
import { createContext, useContext } from "react";
import { getTasksRequest, getTaskRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest } from "../api/tasks.js";

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

  // const getTask = async (id) => {};

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  // const updateTask = async (task) => {};

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);      
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      getTasks,
      // getTask,
      createTask,
      // updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}