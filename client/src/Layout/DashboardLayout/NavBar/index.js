import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

// ----------------------------------------------------------------
// Import Component Templates
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles 
} from '@material-ui/core'

// ----------------------------------------------------------------
// Import Icons for Navbar items list
import { 
  FitnessCenter, 
  AccountBox

} from '@material-ui/icons';


// ----------------------------------------------------------------
// Custom Components
import NavItem from './NavItem'

// ----------------------------------------------------------------
// Styling
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

// ----------------------------------------------------------------
// States: 
// Workout Page Links -> Defines Routes, Text, and Material UI icon
const workoutPageLinks = [
  {
    href: '/app/workouts/squat',
    title: 'Squat',
    icon: FitnessCenter
  },
  {
    href: '/app/workouts/bench',
    title: 'Bench',
    icon: FitnessCenter
  },
  {
    href: '/app/workouts/deadlift',
    title: 'Deadlift',
    icon: FitnessCenter
  },
  {
    href: '/app/workouts/shoulderpress',
    title: 'Shoulder Press',
    icon: FitnessCenter
  },
]

// Utilities -> Defines navbar item routes, text, and Material UI icon
const utilityLinks = [
  {
    href: '/app/account',
    icon: AccountBox,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: AccountBox,
    title: 'Settings'
  },
  {
    href: '/logout',
    icon: AccountBox,
    title: 'Logout'
  },
]

// User data placeholder: Defines current user logged in
const user = {
  avatar: '/static/images/avatars/avatar_creator.jpg',
  userExpLevel: 'Intermediate Dead Lifter',
  name: 'Steve Tran'
};

// ----------------------------------------------------------------
// Primary Export: Navbar Component
const NavBar = ({onMobileClose, openMobile}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect((openMobile, onMobileClose) => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    // Navbar User Info Card Start
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
        <Avatar
          component={RouterLink}
          src={user.avatar}
          style={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.userExpLevel}
        </Typography>
      </Box>
      <Divider />
      {/* Navbar MyWorkouts Start */}
      <Box
        alignItems = 'center'
        display = 'flex'
        flexDirection = 'column'  
        p={2}
      >
        {/* Navbar title */}
        <Typography
          className = {classes.name}
          color = "textPrimary"
          variant = "h5"
        >
          My Workouts
        </Typography>
      </Box>
      <Divider/>
      <Box p={2}>
        <List>
          {workoutPageLinks.map((item) => (
            <NavItem
              href = {item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow ={1}/>
      {/* Navbar Options Start */}
      <Box p={2}>
        <List>
          {utilityLinks.map((item) => (
            <NavItem
              href = {item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
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
