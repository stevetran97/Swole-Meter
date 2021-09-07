import React from 'react'

import { CardContent, Box } from '@material-ui/core'

// Custom Components 
import SingleProgressBar from './Components/SingleProgressBar'

const ProgressionTab = ({
  data
}) => {
  return(
    <CardContent>
      <Box
        height={500}
        position="relative"
      >
        <SingleProgressBar exercise = "SQUAT" improvePercent = {2} exerciseProgressPercent = {100}/>
        <SingleProgressBar exercise = "BENCH PRESS" improvePercent = {3} exerciseProgressPercent = {90}/>
        <SingleProgressBar exercise = "DEADLIFT" improvePercent = {-1} exerciseProgressPercent = {50}/>
        <SingleProgressBar exercise = "SHOULDER PRESS" improvePercent = {0} exerciseProgressPercent = {90}/>
      </Box>
    </CardContent>
  )
}

export default ProgressionTab