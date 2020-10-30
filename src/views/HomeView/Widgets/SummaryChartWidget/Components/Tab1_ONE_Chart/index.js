import React from 'react'
import {
  CardContent,
  useTheme,
  Box,
  colors
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const Tab1_ONE_Chart = () => {
  const theme = useTheme()

  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(0, 65, 179, 0.91)',
        data: [{x:'2020-11-1', y:300}, {x:'2020-11-2', y:303}, {x:'2020-11-3', y:305}, {x:'2020-11-4', y:310}],
        label:'Squat (lb)'
      },
      {
        backgroundColor: 'rgba(48, 95, 176, 0.8)',
        data: [{x:'2020-11-1', y:200}, {x:'2020-11-2', y:203}, {x:'2020-11-3', y:205}, {x:'2020-11-4', y:210}],
        label:'Bench Press (lb)'
      },
      {
        backgroundColor: 'rgba(29, 105, 237, 0.67)',
        data: [{x:'2020-11-1', y:400}, {x:'2020-11-2', y:403}, {x:'2020-11-3', y:405}, {x:'2020-11-4', y:410}],
        label:'Deadlift (lb)'
      }
    ],
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

export default Tab1_ONE_Chart;