import React from 'react'
import {
  CardContent,
  useTheme,
  Box,
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const Tab2REPChart = (props) => {
  const theme = useTheme()

  // Data object rendered by chart: Pass excercise data here through props
  const data = {
    datasets: [
      // Each object is one exercise
      {
        backgroundColor: 'rgba(0, 65, 179, 0.91)',
        // Array of all weights lifted for squat
        data: [{x:'2020-11-1', y:1200}, {x:'2020-11-2', y:1400}, {x:'2020-11-3', y:1600}, {x:'2020-11-4', y:1800}],
        label:'Squat (lb x Reps)'
      },
      {
        backgroundColor: 'rgba(48, 95, 176, 0.8)',
        // Array of all weights lifted for Bench
        data: [{x:'2020-11-1', y:800}, {x:'2020-11-2', y:1000}, {x:'2020-11-3', y:1200}, {x:'2020-11-4', y:1600}],
        label:'Bench Press (lb x Reps)'
      },
      {
        backgroundColor: 'rgba(29, 105, 237, 0.67)',
        // Array of all weights lifted for Deadlift
        data: [{x:'2020-11-1', y:900}, {x:'2020-11-2', y:1800}, {x:'2020-11-3', y:2100}, {x:'2020-11-4', y:2400}],
        label:'Deadlift (lb x Reps)'
      },
      {
        backgroundColor: 'rgba(29, 105, 170, 0.9)',
        // Array of all weights lifted for Shoulder Press
        data: [{x:'2020-11-1', y:200}, {x:'2020-11-2', y:400}, {x:'2020-11-3', y:800}, {x:'2020-11-4', y:1400}],
        label:'Shoulder Press (lb x Reps)'
      }
    ],
  };
  // Bar chart options
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
          type: 'time',
          offset: true,
          time: {
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              'day': 'MMM DD',
           }
          },
          barThickness: 12,
          maxBarThickness: 12,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          ticks: {
            fontColor: theme.palette.text.secondary,
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
            labelString: 'Pounds x Reps'
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

  
  return (
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
  )
}

export default Tab2REPChart;