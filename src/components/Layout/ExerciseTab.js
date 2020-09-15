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
        <Tab label="Workouts" {...a11yProps(0)} />
        <Tab label="Predicted Performance" {...a11yProps(1)} />
        <Tab label="PRs" {...a11yProps(2)} />
      </Tabs>
    </Paper>
  );
}

// a11yProps returns HTML key-value tag pairs. The purpose of this
// is to enhance accessibility for screenreader devices.
//
// This is used in conjunction with the "ExerciseTabPanel" React
// components. "aria-controls" tells us that these tabs are the
// controllers for the tab panels.
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
