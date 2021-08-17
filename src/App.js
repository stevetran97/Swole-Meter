import React from "react";
import { useRoutes } from 'react-router-dom';
import routes from './route_list'

import {ThemeProvider} from '@material-ui/core';
import DefaultStyle from './components/DefaultStyles';
import theme from './theme'

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <DefaultStyle/>
        {routing}
    </ThemeProvider>
  );
};

export default App;


// ----------------------------------------------------------------
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import BasePage from "./components/Layout/BasePage.jsx";
// import ExercisePage from "./components/ExerciseLayout/ExercisePage.jsx";
// import HomePage from "./components/HomeLayout/Home.jsx";