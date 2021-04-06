import React, { useState, useContext, useEffect } from 'react'
import TaskContext from '../contexts/Task';
import AuthContext from '../contexts/Auth';
import { Table, Checkbox, Input, Form, Button, Card } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Column } = Table;
const { Item } = Form;

function TaskList() {
  const { user, logout } = useContext(AuthContext)
  const emptyTask = {
    category: '', 
    name: '', 
    completed: false,
    uid: user.uid
  }
  const [newTask, setNewTask] = useState(false);
  const [task, setTask] = useState(emptyTask)
  const { tasks, addTask, updateTask, getTasks } = useContext(TaskContext);  

  useEffect(() => {
    getTasks(user.uid);
  },[user])

  const updateCompleted = task => {
    task.task.completed = !task.task.completed;
    updateTask(task);
  };

  const saveTask = () => {
    addTask(task).then(() => cancelTask(/*complete the cancel task todo*/))
  };

  const cancelTask = () => {
    //todo: reset the task state and hide the form
    setTask(emptyTask);
    setNewTask(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    // todo: update the task state with these variables
    setTask(task => ({...task, [name]: value}));
  };

  return (
    <div className="TaskList">
      <Card
        title="My Tasks"
        extra={<Button onClick={() => setNewTask(!newTask)}>+</Button>}
      >
        {
          newTask && (
            <Form name="basic" {...layout} onFinish={saveTask}>
              <Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please input a category!" }]}
              >
                <Input name="category" onChange={(e) => handleChange(e)} value={task.category} />
              </Item>
              <Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input name="name" onChange={(e) => handleChange(e)} value={task.name} />
              </Item>
              <Item {...tailLayout}>
                <Button type="primary"
                  disabled={ !(task.name.length && task.category.length) }
                  htmlType="submit"
                >
                  Save
              </Button>

                <Button type="button"
                  onClick={cancelTask}
                >
                  Cancel
              </Button>
              </Item>
            </Form>
          )
        }
      </Card>

      <Table dataSource={tasks}>
        <Column title="Category"
          dataIndex={["task", "category"]}
          key="category"
        />
        <Column title="Name"
          dataIndex={["task", "name"]}
          key="name"
        />
        <Column title="Completed"
          dataIndex={["task", "completed"]}
          key="completed"
          render={(_, task) => {
            return <Checkbox onChange={() => updateCompleted(task) } checked={task.task.completed} />
          }}
        />
      </Table>
      
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default TaskList;