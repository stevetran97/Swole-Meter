import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'


import {
  Box, Card, CardContent, Grid, LinearProgress, Typography, makeStyles, colors, Avatar
} from '@material-ui/core'

import ExerciseProgress from "./WidgetTemplates/ExcerciseProgress"

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const WorkoutProgress = ({className, ...rest})  => {
  const classes = useStyles();

  return (
    <Card className = {clsx(classes.root, className)}
    {...rest}
    >
      <ExerciseProgress exercise = "SQUAT" improvement_percent = {50} exercise_progress_percent = {30}/>
      <ExerciseProgress exercise = "BENCHPRESS" improvement_percent = {60} exercise_progress_percent = {90}/>
      <ExerciseProgress exercise = "DEADLIFT" improvement_percent = {50} exercise_progress_percent = {100}/>
      <ExerciseProgress exercise = "SHOULDER PRESS" improvement_percent = {50} exercise_progress_percent = {90}/>
    </Card>
  )
}

WorkoutProgress.propTypes = {
  className: PropTypes.string
}
export default WorkoutProgress