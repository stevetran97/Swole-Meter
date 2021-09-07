import React from 'react'
import {
  CardContent,
  useTheme,
  Box,
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const BarChartTab = ({
  data,
  workoutUnits
}) => {
  console.log(typeof workoutUnits)
  const theme = useTheme()
  
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
            labelString: workoutUnits
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

export default BarChartTab;