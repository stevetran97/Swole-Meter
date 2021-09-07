import React from 'react';
import PropTypes from 'prop-types'

import {
  Box, CardContent, Grid, LinearProgress, Typography, makeStyles, withStyles, Button
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  textImproved: {
    color: "green"
  },
  textDecline: {
    color: "red"
  },
}));

const SingleProgressBar = ({
  exercise, // String denoting exercise type (bench, squat, etc.)
  exerciseProgressPercent, //Percentage of goal reached
  improvePercent // Percentage improved since some time
}) => {
  const classes = useStyles()

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

  return(
    <CardContent> 
      <Grid
        container
        justify="space-between"
        spacing = {1}
      >
        <Grid item>
          {/* Exercise Title */}
          <Typography
            style={{color: 'textSecondary'}}        
            gutterBottom
            variant = 'h5'
          >
            {exercise}
          </Typography>
        </Grid>
        <Box>
          {/* Conditional Render: New Goal Button */}
          {exerciseProgressPercent >= 100 && (
            <Button style={{
              color: "textPrimary",
              variant: 'h3'
            }}
            >
              New Goal
            </Button>)
          }
        </Box>
      </Grid>
      <Box mt={1}>
        <BorderLinearProgress
          variant = 'determinate'
          value = {exerciseProgressPercent}
        />
      </Box>
      <Box mt={1} 
        display = "flex"
        alignItems = "center"
      >
        <Grid
        container
        justify = "space-between"
        spacing={1}
        >
          <Grid item>
            {/* <GoalPercentageDisplay/> */}
            <Typography
              className={improvePercent > 0 ? classes.improvedText : ''}
              color = "textPrimary"
              variant = 'h3'
            >
              {exerciseProgressPercent}%
            </Typography>
          </Grid>
          <Grid item>
            <Box mt = {1}
              display = "flex"
              alignItems ='centre'
            >
              {/* Improvement Indicator*/}
              {improvePercent > 0 ? (
                  <KeyboardArrowUpIcon style={{fill: "green"}} />
                ) : (improvePercent < 0 ? (
                    <KeyboardArrowDownIcon style={{fill: "red"}}/>
                  ) : (
                    <></>
                  )
                )
              }
              <Typography 
                className={improvePercent > 0 ? classes.textImproved : (improvePercent < 0 ? classes.textDecline : '')}
                variant = 'body1'
              >
                {improvePercent} % 
              </Typography>
            </Box>           
          </Grid> 
        </Grid>
      </Box>
    </CardContent>
  );
};

SingleProgressBar.propTypes = {
  className: PropTypes.string
}
export default SingleProgressBar