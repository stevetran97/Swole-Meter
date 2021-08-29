import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeView from "./views/HomeView";
import DashboardLayout from "./Layout/DashboardLayout"
// import BasePage from "./views/ExerciseView/BasePage.jsx";
// import ExercisePage from "./views/ExerciseView/ExercisePage.jsx";

import Login from './views/SignInViews/Login.jsx'
import Register from './views/SignInViews/Register.jsx'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <HomeView /> },
      // {path: 'workouts/squat', element: <HomeView/>},
      // {path: 'workouts/bench', element: <HomeView/>},
      // {path: 'workouts/deadlift', element: <HomeView/>}

    ]
  },
  {
    path: 'user',
    // Need to remove this and change it to some MainLayout without Dashboard side bar
    element: <DashboardLayout />,
    children: [
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register />},
    ]
  },
  {
    path: '/',
    // Need to remove this and change it to some MainLayout without Dashboard side bar
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> }
    ]
  }
];

export default routes;

