import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button, 
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto',
    fontSize: 18,
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon':  {
      color: theme.palette.primary.main
    }
  }
}));

// Primary Single NavItem Component
const NavItem = ({
  className, 
  href,
  icon: Icon,
  title,
  ...rest
})  =>  {
  const classes = useStyles();

  return  (
    <ListItem
      className = {clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && (
          <Icon
            className = {classes.icon}
            style={{ fontSize: 20 }}
          />
        )}
        <Typography>
          <span className={classes.title}>
            {title}
          </span>
        </Typography>        
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  classesName: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;