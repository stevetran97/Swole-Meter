import React from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types'
import {
  Card,  makeStyles, Container, Grid 
} from '@material-ui/core'

import SingleProgressBar from "./Components/SingleProgressBar";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
  },
}));

const HomeProgressionWidget = ({className, ...rest})  => {
  const classes = useStyles();

  return (
                <Card 
                  className = {clsx(classes.root, className)}
                  {...rest}
                >
                  <SingleProgressBar exercise = "SQUAT" improvement_percent = {50} exercise_progress_percent = {30}/>
                  <SingleProgressBar exercise = "BENCHPRESS" improvement_percent = {60} exercise_progress_percent = {90}/>
                  <SingleProgressBar exercise = "DEADLIFT" improvement_percent = {50} exercise_progress_percent = {100}/>
                  <SingleProgressBar exercise = "SHOULDER PRESS" improvement_percent = {50} exercise_progress_percent = {90}/>
                </Card>
  )
}

// HomeProgressionWidget.propTypes = {
//   className: PropTypes.string
// }
export default HomeProgressionWidget


//CardContent, Grid, LinearProgress, Typography, Avatar, Box,