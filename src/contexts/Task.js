import React, { createContext, useState } from 'react';
import {fbAddTask, fbGetTasks, fbUpdateTask} from '../services/firebase';


const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  console.log("all tasks", tasks);

  async function getTasks(userID) {
    await fbGetTasks(userID).then(response => {
      setTasks(response);
    });
  };

  async function addTask(task) {
    await fbAddTask(task).then(id => {
      //todo: add the new task you just created to the tasks state
      setTasks(tasks => [...tasks, { id, task }]);
    });
  }

  async function updateTask(task) {
    await fbUpdateTask(task).then(() => {
      //todo: update the task in the local state that was completed/uncompleted
      setTasks(tasks => {
        const newTasks = [...tasks];
        const taskIdx = newTasks.findIndex(someTask => someTask.id === task.id);
        newTasks[taskIdx] = task;
        return newTasks;
      });
    });
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
