import React from 'react'
import {
  CardContent, 
  useTheme, 
  Box
} from '@material-ui/core'

import { Radar } from 'react-chartjs-2'

const Tab1_ONE_Composition = () => {
  const theme = useTheme()

  // Data object rendered by chart: Pass excercise data here through props
  const data = {
    labels: ['SQUAT', 'BENCH', 'DEADLIFT', 'SHOULDER PRESS'],
    datasets: [
      {
        label: 'LB x REP',
        data: [2500, 3000, 3500, 6000],
        backgroundColor: 'rgba(21, 88, 203, 0.6)',
        borderWidth: 1,
      },
    ],
  }

  // Radar formatting options
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

  return (
    <CardContent>
      <Box
        height={500}
        position="relative"
      >
        <Radar data={data} options={options}/> 
      </Box>
    </CardContent>
  ) 
}

export default Tab1_ONE_Composition