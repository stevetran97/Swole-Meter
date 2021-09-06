import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom Components
import HomeView from "./views/HomeView";
import DashboardLayout from "./Layout/DashboardLayout"
// import BasePage from "./views/ExerciseView/BasePage.jsx";
// import ExercisePage from "./views/ExerciseView/ExercisePage.jsx";

import Login from './views/SignInViews/Login'
import Register from './views/SignInViews/Register'

// import Auth from './modules'

// Wrappers
import AppRoutes from './components/AppRoutes'


// Primary Route Junction
const routes = [
  {
    path: 'app',
    element: <AppRoutes isPrivate={true}><DashboardLayout /></AppRoutes>,
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

