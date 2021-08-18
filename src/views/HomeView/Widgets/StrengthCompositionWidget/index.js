import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'
import {
  makeStyles, 
  useTheme,   
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Button
} from '@material-ui/core'

// ----------------------------------------------------------------
// Styles
// Applies base style to the page
const useStyles = makeStyles(() => ({
  root:{}
}));

// Modified card style. Only card related
var cardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: "100%",
}

// ----------------------------------------------------------------
// Primary Widget Function
const StrengthCompositionWidget = ({className, ...rest}) => {
  // Create styles within the function
  const classes = useStyles();
  const theme = useTheme();

  // Primary data variable. Controls exercise label (squats), Radar chart value (Work), radar color
  const data = {
    labels: ['SQUAT', 'BENCH', 'DEADLIFT'],
    datasets: [
      {
        label: 'LB x REP',
        data: [2500, 3000, 3500],
        backgroundColor: 'rgba(21, 88, 203, 0.6)',
        borderWidth: 1,
      },
    ],
  }

  //Widget formatting options. Not related to data series.
  const options = {
    bodyFontColor: theme.palette.text.primary,
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    cornerRadius: 0,
    layout: {padding: 0},
    legend: {display: false},
    tooltips: {
      backgroundColor:  theme.palette.background.default,
      bodyFontColor: theme.palette.text.primary,
      borderColor: theme.palette.divider,
      borderWidth: 1, 
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    },
    scale: {
      ticks:  {
        suggestedMin: 0
      }
    }
  };

  // Returned widget
  return(
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
      style = {cardStyle}
    >
      <CardHeader
        title = "WORK"
        height={10}
      />
      <Divider/>
      <CardContent>
        <Box
          height={500}
          position="relative"
        >
          <Radar data={data} options={options}/> 
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
        <Button style={{size: "small", variant: "h6"}}>
          TOT
        </Button>
      </Box>
    </Card> 
  )
}

StrengthCompositionWidget.propTypes = {
  className: PropTypes.string
};

export default StrengthCompositionWidget;