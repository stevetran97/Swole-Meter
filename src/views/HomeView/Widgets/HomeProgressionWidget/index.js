import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import {
  Card, CardContent,  makeStyles, CardHeader, Button, Typography, Divider, Box
} from '@material-ui/core'

// Custom Components
import SingleProgressBar from "./Components/SingleProgressBar";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {},
}));

// Modified card style. Only card related
var cardStyle = {
  display: 'block',
  transitionDuration: '0.3s'
}

// Primary Component: Progression Widget
const HomeProgressionWidget = ({className, ...rest})  => {
  const classes = useStyles();
  return (
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
      style = {cardStyle}
    >
      <CardHeader
        title = 'PROGRESSION'
        action={(
          <>
            <Box m={1} height={10}>
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
      <Divider/>
      <CardContent>
        <Box
          height={500}
          position="relative"
        >
          <SingleProgressBar exercise = "SQUAT" improvement_percent = {2} exercise_progress_percent = {30}/>
          <SingleProgressBar exercise = "BENCH PRESS" improvement_percent = {1} exercise_progress_percent = {90}/>
          <SingleProgressBar exercise = "DEADLIFT" improvement_percent = {-1} exercise_progress_percent = {100}/>
          <SingleProgressBar exercise = "SHOULDER PRESS" improvement_percent = {3} exercise_progress_percent = {90}/>
        </Box>
      </CardContent>
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={1}
        height={50}
      >
        <Button style={{size: "small", variant: "h6"}}>
          ONE
        </Button>
        <Button style={{size: "small", variant: "h6"}}>
          MUL
        </Button>
      </Box>
    </Card>
  )
}

HomeProgressionWidget.propTypes = {
  className: PropTypes.string
}
export default HomeProgressionWidget


//CardContent, Grid, LinearProgress, Typography, Avatar, Box,