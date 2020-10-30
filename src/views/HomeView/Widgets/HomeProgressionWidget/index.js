import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import {
  Card,  makeStyles, CardHeader, Button, Typography, Grid, Box
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
    <Card>
      <CardHeader
        title = 'PROGRESSION'
        action={(
          <>
            <Box m={1}>
              <Typography 
                color = 'textSecondary'
                variant = "caption"
              >
                This Month
              </Typography>    
            </Box>
          </>
        )}
      />
      <Card 
        className = {clsx(classes.root, className)}
        {...rest}
      >
        <SingleProgressBar exercise = "SQUAT" improvement_percent = {2} exercise_progress_percent = {30}/>
        <SingleProgressBar exercise = "BENCH PRESS" improvement_percent = {1} exercise_progress_percent = {90}/>
        <SingleProgressBar exercise = "DEADLIFT" improvement_percent = {-1} exercise_progress_percent = {100}/>
        <SingleProgressBar exercise = "SHOULDER PRESS" improvement_percent = {3} exercise_progress_percent = {90}/>
      </Card>
    </Card>
  )
}

HomeProgressionWidget.propTypes = {
  className: PropTypes.string
}
export default HomeProgressionWidget


//CardContent, Grid, LinearProgress, Typography, Avatar, Box,