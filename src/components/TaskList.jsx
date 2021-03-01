import React, { useState, useContext } from 'react'
import TaskContext from '../contexts/Task'

function TaskList() {
  const [newTask, setNewTask] = useState(false);
  const [task, setTask] = useState({category: '', name: '', completed: false})
  const { tasks, addTask, updateTask } = useContext(TaskContext);

  const updateCompleted = task => {
    task.task.completed = !task.task.completed;
    updateTask(task);
  };

  const saveTask = () => {
    addTask(task).then(() => cancelTask(/*complete the cancel task todo*/))
  };

  const cancelTask = () => {
    //todo reset the task state and hide the form
  };

  const handleChange = e => {
    const { name, value } = e.target;
    //todo update the task state with these variables
  };

  return (
    <div className="TaskList">
      <button onClick={() => setNewTask(!newTask)}>+</button>
      <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {
          newTask && (
            <tr>
              <td>
                <input type="text" value={task.category} onChange={handleChange} name="category"/>
              </td>
              <td>
                <input type="text" value={task.name} onChange={handleChange} name="name"/>
              </td>
              <td>
                <button disabled={task.name.length === 0 || task.category.length === 0 ? true : false} onClick={saveTask}>save</button> <br/>
                <button onClick={cancelTask}>cancel</button>
              </td>
            </tr>
          )
        }
        {
          tasks.map(task => (
            <tr key={task.id}>
              <td>{task.task.category}</td>
              <td>{task.task.name}</td>
              <td><input type="checkbox" checked={task.task.completed} onChange={() => updateCompleted(task)}/></td>
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  );
}

export default TaskList;
