import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles 
} from '@material-ui/core'

import NavItem from './NavItem'

const items = [
  {
    href: '/app/dashboard',
    title: 'Dashboard'
  },
  {
    href: '/app/workouts/squat',
    title: 'Squat'
  },
  {
    href: '/app/workouts/bench',
    title: 'Bench'
  },
  {
    href: '/app/workouts/deadlift',
    title: 'Deadlift'
  },
]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width:256, 
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({onMobileClose, openMobile}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box 
      height = '100%'
      display = 'flex'
      flexDirection='column'
    >
      <Box
        alignItems = 'center'
        display = 'flex'
        flexDirection = 'column'  
        p={2}
      >
        <Typography
          className = {classes.name}
          color = "textPrimary"
          variant = "h5"
        >
          Contents
        </Typography>
      </Box>
      <Divider/>
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href = {item.href}
              key={item.title}
              title={item.title}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow ={1}/>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor = 'left'
          classes={{paper: classes.mobileDrawer}}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor = 'left'
          classes = {{paper: classes.desktopDrawer}}
          open
          variant='persistent'
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
