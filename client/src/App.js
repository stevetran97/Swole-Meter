import React, { useState } from "react";
import { useRoutes } from 'react-router-dom';
import routes from './route_list'

import { ThemeProvider } from '@material-ui/core';
import DefaultStyle from './components/DefaultStyles';
import theme from './theme'

const App = () => {
  // Apply data layer
  const [userData, setUserData] = useState({
    // Provides all data for user who is currently logged in
    // Pass data to componenets
  })

  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <DefaultStyle />
      {routing}
    </ThemeProvider>
  );
};

export default App;

