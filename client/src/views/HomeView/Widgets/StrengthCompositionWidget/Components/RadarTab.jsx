import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent, 
  useTheme, 
  Box
} from '@material-ui/core'

import { Radar } from 'react-chartjs-2'

const RadarTab = ({
  data,
  ...rest
}) => {
  const theme = useTheme()

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

RadarTab.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object
};

export default RadarTab