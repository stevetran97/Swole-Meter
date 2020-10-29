import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2'
import {
  Box,
  Button, 
  Card,
  CardContent,
  CardHeader, 
  Divider, 
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root:{}
}));

const SummaryChartWidget  = ({className, ...rest})  =>  {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[900],
        data:[18,5,19,27,29,19,20,5,19,27,29, 200, 211, 230, 240],
        label:'Bench (lb)'
      },
      {
        backgroundColor: colors.red[900],
        data: [1,0,4,2,55,0,0,0,81,76, 200, 211, 222, 240, 300, 400],
        label:'Squat (lb)'
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '1 Aug', '2 Aug', '3 Aug']
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    cornerRadius: 0,
    layout: {padding: 0},
    legend: {display: true},
    scales: {
      xAxes:  [
        {
          barThickness: 12,
          maxBarThickness: 12,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines:  {
            display: true,
            drawBorder: true
          }
        }
      ],
      yAxes: [
        { 
          scaleLabel: {
            fontSize: 14,
            fontColor: theme.palette.text.primary,
            display: true,
            labelString: 'Pounds'
          },
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines:  {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor:  theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1, 
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return  (
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button
            endIcon = {<ArrowDropDownIcon/>}
            size = "small"
            variant = "text"
          >
            Last {data.labels.length} days
          </Button>
        )}
        title = "COMPOUND RECORD"
      />
      <Divider/>
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color='primary'
          endIcon={<ArrowRightIcon/>}
          size='small'
          variant='text'
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

SummaryChartWidget.propTypes = {
  className: PropTypes.string
};

export default SummaryChartWidget;