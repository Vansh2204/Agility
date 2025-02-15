import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthHandler } from './store/auth.js'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import MyWork from './pages/MyWork';
import Login from './pages/Login';
import Header from './components/Header.js';
import Test from './pages/Test';
import { ToastContainer } from 'react-toastify';
import Sprints from './pages/Sprints.js';
import Profile from './pages/Profile.js';
import Project from './pages/Project.js';
import ProjectDetail from './pages/ProjectDetail.js';
import SprintDetail from './pages/SprintDetail.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const location = useLocation();
// const noHeaderRoutes = ["/login", "/register"];
root.render(
  <AuthHandler>
    <StrictMode>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<Dashboard />} >
            <Route path='' element={<HomePage />} />
            <Route path='mywork' element={<MyWork />} />
            <Route path='sprint' element={<Sprints />} />
            <Route path='profile' element={<Profile />} />
            <Route path='project' element={<Project />} />
            <Route path='project/:projectID' element={<ProjectDetail />} />
            <Route path='project/:projectID/sprint/:sprintID' element={<SprintDetail />} />



          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </StrictMode>
  </AuthHandler>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
