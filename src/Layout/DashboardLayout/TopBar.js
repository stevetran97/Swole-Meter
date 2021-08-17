import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar, 
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className, 
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar
      className = {clsx(classes.root, className)}
      elevation = {0}
      {...rest}
    >
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              color = 'inherit'
              onClick = {onMobileNavOpen}
            >
              <MenuIcon/>
            </IconButton>
          </Hidden>
          <Box flexGrow={1} />
          <RouterLink to="/">
            <Logo width={45}/>
          </RouterLink>   
        </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;


// import NotificationsIcon from '@material-ui/core';
// import InputIcon from '@material-ui/core';
// import Logo from 'src/component/Logo';
// import { Link as RouterLink } from 'react-router-dom';