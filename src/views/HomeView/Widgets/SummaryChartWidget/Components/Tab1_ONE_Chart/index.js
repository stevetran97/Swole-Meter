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
        data:[350, 355, 355, 0, 0, 365, 365],
        label:'Squat (lb)'
      },
      {
        backgroundColor: 'rgba(48, 95, 176, 0.8)',
        data: [0, 0, 0, 0, 215, 220, 0, 0, 0, 225, 225],
        label:'Bench Press (lb)'
      },
      {
        backgroundColor: 'rgba(29, 105, 237, 0.67)',
        data: [350, 350, 355, 0, 0, 0, 0, 370, 0, 0],
        label:'Deadlift (lb)'
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug']
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