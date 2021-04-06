import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/Auth';
import { Form, Button, Input, Card } from "antd";
const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const Login = () => {
  const { login, createAccount } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <Card title={createAccount ? "Create Account" : "Login"}>

        <Form
          name="basic"
          {...layout}
        >
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Item>

          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Item>

          <Item {...tailLayout}>
            <Button type="primary"
              onClick={() => login(email, password)}
            >
              Login
            </Button>

            <Button type="primary"
              onClick={() => createAccount(email, password)}
            >
              Create Account
            </Button>
          </Item>
        </Form>
      </Card>

    </div>
  )
}

export default Login;