import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom Components
import HomeView from "./views/HomeView";
import DashboardLayout from "./Layout/DashboardLayout"

import Login from './views/SignInViews/Login'
import Register from './views/SignInViews/Register'

// Wrappers
import ProtectedRoute from './components/ProtectedRoute'


// Primary Route Junction
const routes = [
  {
    path: 'app',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'dashboard', element: <HomeView /> },
      // {path: 'workouts/squat', element: <HomeView/>},
      // {path: 'workouts/bench', element: <HomeView/>},
      // {path: 'workouts/deadlift', element: <HomeView/>}
    ]
  },
  {
    path: '/',
    // Need to remove this and change it to some MainLayout without Dashboard side bar
    element: <DashboardLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Navigate to="/login" /> }
    ]
  }
];

export default routes;

