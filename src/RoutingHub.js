import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeView from "./views/HomeView";
import DashboardLayout from "./Layout/DashboardLayout"


const routes = [
  {
    path: 'app',
    element: <DashboardLayout/>,
    children: [
      {path: 'dashboard', element: <HomeView/>},
      {path: 'squat', element: <HomeView/>},
      {path: 'bench', element: <HomeView/>},
      {path: 'deadlift', element: <HomeView/>}


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


// const routes = {
//   '/': () => (<DashboardLayout><HomeView /></DashboardLayout>),
// };

export default routes;




// export default routes;


// import { Navigate } from 'hookrouter';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import BasePage from "./components/Layout/BasePage.jsx";
// import ExercisePage from "./components/ExerciseLayout/ExercisePage.jsx";