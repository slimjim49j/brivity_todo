import React, { createContext, useState } from 'react';
import {fbAddTask, fbGetTasks, fbUpdateTask} from '../services/firebase';


const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    await fbGetTasks().then(response => {
      setTasks(response);
    })
  };

  async function addTask(task) {
    await fbAddTask(task).then(response => {
      // todo
      // instert task into state rather than making new call
      getTasks();
    })
  }

  async function updateTask(task) {
    await fbUpdateTask(task).then(() => {
      // todo
      // update task in state rather than making new call
      getTasks();
    })
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        getTasks,
        addTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
