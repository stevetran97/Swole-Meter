import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FitnessCenter,
} from "@material-ui/icons";
import drawerWidth from "./constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function Drawer({ open, setOpen, history }) {
  const classes = useStyles();
  const theme = useTheme();

  const itemList = [
    {
      text: "Squat",
      icon: <FitnessCenter />,
      onClick: () => history.push("/squat"),
    },
    {
      text: "Bench",
      icon: <FitnessCenter />,
      onClick: () => history.push("/bench"),
    },
    {
      text: "Deadlift",
      icon: <FitnessCenter />,
      onClick: () => history.push("/deadlift"),
    },
  ];

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key={"Home"} onClick = {
          () => history.push("")
        }>
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {itemList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon><FitnessCenter /></ListItemIcon>}
              <ListItemIcon><FitnessCenter /></ListItemIcon>
              <ListItemText key={text}>{text}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </MuiDrawer>
  );
}

export default withRouter(Drawer);
