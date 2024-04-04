import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css"
import { SignIn } from './Components/SignIn';
import { Protected } from './Components/Protected';
import { UserList } from './Components/UserList';
import { AddUser } from './Components/AddUser';
import setupAxiosInterceptors from './AxiosIntersepter';

setupAxiosInterceptors()

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/" />;
};

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/protected"
            element={<PrivateRoute element={<Protected />} />}
          />
           <Route
            path="/userList"
            element={<PrivateRoute element={<UserList />} />}
          />
           <Route
            path="/addUser"
            element={<PrivateRoute element={<AddUser />} />}
          />
         
        </Routes>
      </Router>
  );
};

export default App;
