import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeView from "./views/HomeView";
import DashboardLayout from "./Layout/DashboardLayout"
// import BasePage from "./views/ExerciseView/BasePage.jsx";
// import ExercisePage from "./views/ExerciseView/ExercisePage.jsx";

const routes = [
  {
    path: 'app',
    element: <DashboardLayout/>,
    children: [
      {path: 'dashboard', element: <HomeView/>},
      // {path: 'workouts/squat', element: <HomeView/>},
      // {path: 'workouts/bench', element: <HomeView/>},
      // {path: 'workouts/deadlift', element: <HomeView/>}
    ] 
  },
  {
    path: '/',
    element: <DashboardLayout/>,
    children: [
      {path: '/', element: <Navigate to="/app/dashboard"/>  }
    ]
  }
];

export default routes;

