import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {
  Box, CardContent, Grid, LinearProgress, Typography, makeStyles, colors, Avatar
} from '@material-ui/core'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

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

class SingleProgressBar extends Component  {
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
                {this.props.exercise}
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

SingleProgressBar.propTypes = {
  className: PropTypes.string
}
export default SingleProgressBar


// import clsx from 'clsx';

// import { render } from 'nprogress';

// const ExerciseProgress = ({className, ...rest})  => {
//   const classes = useStyles();