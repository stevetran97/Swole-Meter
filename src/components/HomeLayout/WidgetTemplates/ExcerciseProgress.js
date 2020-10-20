import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'


import {
  Box, Card, CardContent, Grid, LinearProgress, Typography, makeStyles, colors, Avatar
} from '@material-ui/core'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

// import { render } from 'nprogress';

const classes = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

// const ExerciseProgress = ({className, ...rest})  => {
//   const classes = useStyles();

class ExerciseProgress extends Component  {
  constructor(props)  {
    super(props);

    // this.state = {
    //   improvement_percent: 12, 
    //   exercise_progress_percent: 90
    // };
  }

  
  render() {
    return (
      <CardContent> 
          <Grid
            container
            justify="space-between"
            spacing = {3}
          >
            {/* Title */}
            <Grid item>
              <Typography
                color = 'textSecondary'
                gutterBottom
                variant = "h6"
              >
                {this.props.exercise} PROGRESS
              </Typography>
            </Grid>
            {/* Title */}

            {/* Icon */}
            <Grid item>
             <Avatar className = {classes.avatar}
              >
                <InsertChartIcon/>
              </Avatar>
            </Grid>
            {/* Icon */}
          </Grid>
          

          {/* Progress Bar */}
          <Box mt={1}>
            <LinearProgress
              value = {this.props.exercise_progress_percent}
              variant = "determinate"
            />
          </Box>
          {/* Progress Bar */}

          {/* Lower Stats Indicator */}
          <Box mt = {1} 
            display = "flex"
            alignItems = "center"
          >
            <Grid
            container
            justify = "space-between"
            spacing={3}>
              <Grid item>
              <Typography
                color = "textPrimary"
                variant = 'h3'
              >
                {this.props.exercise_progress_percent}%
              </Typography>
              </Grid>

              <Grid item>
                {/* Percentage Improvement */}
                <Box mt = {1}
                display = "flex"
                alignItems ='centre'
                >
                  <ArrowDownwardIcon className={classes.differenceIcon} />
                  <ArrowUpwardIcon className={classes.differenceIcon} />
                  <Typography 
                  className={classes.differenceValue}
                  variant = 'body2'>
                    {this.props.improvement_percent} %
                  </Typography> 
                  
                </Box>
                <Typography 
                  color = 'textSecondary'
                  variant = "caption">
                    Since Last Month
                </Typography> 
              </Grid> 
              {/* Percentage Improvement */}


            </Grid>
          </Box>
          {/* Lower Stats Indicator */}

        </CardContent>
    )
  }
}

ExerciseProgress.propTypes = {
  className: PropTypes.string
}
export default ExerciseProgress