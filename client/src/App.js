import React from "react";
import { useRoutes } from 'react-router-dom';
import routes from './route_list'

import { ThemeProvider } from '@material-ui/core';
import DefaultStyle from './components/DefaultStyles';
import theme from './theme'

import { AuthProvider } from './context';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <DefaultStyle />
        {routing}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

