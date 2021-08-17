import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types'

import {
  Box, CardContent, Grid, LinearProgress, Typography, makeStyles, withStyles, Button
} from '@material-ui/core'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


// Styles for ProgressBar Component
const classes = makeStyles(() => ({
  root: {
    height: '100%'
  },
}));

// Single Full ProgressBar Component
function SingleProgressBar(props) {

  // Custom ProgressBar for Local Component use
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

  // FINISHED Custom ProgressBar for Local Component use
  const FinishedBorderLinearProgress = withStyles((theme) => ({
    colorPrimary: {
      backgroundColor: theme.palette.green[theme.palette.type === 'light' ? 200 : 700],
    },
  }))(BorderLinearProgress);

  // Chooses up or down progress arrow depending on the percentage improvement
  const ChooseImprovDirec = () => {
    if (props.improvement_percent > 0) {
      return (
        <>
          <ArrowUpwardIcon className={classes.differenceIcon} style={{fill: "green"}} />
          <ImprovedText
            className={classes.differenceValue}
            variant = 'body2'
          >
            {props.improvement_percent} % 
          </ImprovedText> 
        </>
      )
    } else if (props.improvement_percent < 0) {
      return (
        <>
          <ArrowDownwardIcon className={classes.differenceIcon} style={{fill: "red"}}/>
          <DeclineText 
            className={classes.differenceValue}
            variant = 'body2'
          >
            {props.improvement_percent} % 
          </DeclineText > 
        </>
      )
    }
  }

  // Custom Typography for Improvement Indication
  const ImprovedText = withStyles({
    root: {
      color: "green"
    },
  })(Typography);

  // Custom Typography for Decline Indication
  const DeclineText = withStyles({
    root: {
      color: "red"
    },
  })(Typography);

  // Green at 100% goal
  const GoalPercentageDisplay = () => {
    if (props.exercise_progress_percent >= 100) {
      return (
        <ImprovedText
          color = "textPrimary"
          variant = 'h3'
        >
          {props.exercise_progress_percent}%
        </ImprovedText>
      )
    } else if (props.exercise_progress_percent <= 100) {
      return (
        <Typography
          color = "textPrimary"
          variant = 'h3'
        >
          {props.exercise_progress_percent}%
        </Typography>
      )
    }
  }

  // Green at 100% goal
  const SetGoalButton = () => {
    if (props.exercise_progress_percent >= 100) {
      return (
        <Button style={{
          color: "textPrimary",
          variant: 'h3'
        }}
        >
          New Goal
        </Button>
      )
    } else if (props.exercise_progress_percent <= 100) {
      return <Box/>
    }
  }

  // Single Full ProgressBar Component
  return (
    <CardContent> 
        <Grid
          container
          justify="space-between"
          spacing = {1}
        >
          <Grid item>
            <Typography
              style={{color: 'textSecondary', variant: "h6"}}        
              gutterBottom
            >
              {props.exercise}
            </Typography>
          </Grid>
          <Box>
            <SetGoalButton/>
          </Box>
        </Grid>
        <Box mt={1}>
          <BorderLinearProgress
            variant = 'determinate'
            value = {props.exercise_progress_percent}
          />
        </Box>
        <Box mt = {1} 
          display = "flex"
          alignItems = "center"
        >
          <Grid
          container
          justify = "space-between"
          spacing={1}
          >
            <Grid item>
              <GoalPercentageDisplay/>
            </Grid>
            <Grid item>
              <Box mt = {1}
                display = "flex"
                alignItems ='centre'
              >
                <ChooseImprovDirec/>
              </Box>           
            </Grid> 
          </Grid>
        </Box>
      </CardContent>
  )
}

SingleProgressBar.propTypes = {
  className: PropTypes.string
}
export default SingleProgressBar