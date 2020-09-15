import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function ExerciseTabs(props) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setTabIndex(newValue);
  };

  return (
    <Paper className={classes.root} elevation={4}>
      <Tabs
        value={props.tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Workouts" />
        <Tab label="Predicted Performance" />
        <Tab label="PRs" />
      </Tabs>
    </Paper>
  );
}
