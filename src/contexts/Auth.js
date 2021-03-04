import React, { createContext, useState } from 'react';
import {fbLogin, fbCreateAccount} from '../services/firebase';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkForUser = () => {
    let localUser = localStorage.getItem('@user');
    if(localUser){
      setUser(JSON.parse(localUser))
    } 
  }
  
  const createAccount = (email, password) => {
    fbCreateAccount(email, password).then(user => {
      setUser(user);
      localStorage.setItem('@user', JSON.stringify(user));
    })
  };

  const login = (email, password) => {
    fbLogin(email,password).then(user => {
      setUser(user);
      localStorage.setItem('@user', JSON.stringify(user));
    })
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        createAccount,
        checkForUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
