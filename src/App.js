import React, {useContext, useEffect} from 'react'
import './App.css';
import AuthContext from './contexts/Auth'
import TaskList from './components/TaskList';
import Login from './components/auth/Login';
import 'antd/dist/antd.css';


function App() {
  const { user, checkForUser } = useContext(AuthContext);

  useEffect(() => checkForUser(),[])

  return (
    <div className="App">
      <header className="App-header">
        {
          user ? <TaskList /> : <Login />
        }
      </header>
    </div>
  );
}

export default App;
