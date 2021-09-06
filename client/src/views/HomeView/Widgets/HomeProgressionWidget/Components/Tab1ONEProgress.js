import React from 'react'

import { CardContent, Box } from '@material-ui/core'

// Custom Components 
import SingleProgressBar from './Components/SingleProgressBar'

const Tab1ONEProgress = () => {
  return(
    <CardContent>
      <Box
        height={500}
        position="relative"
      >
        <SingleProgressBar exercise = "SQUAT" improvement_percent = {2} exercise_progress_percent = {30}/>
        <SingleProgressBar exercise = "BENCH PRESS" improvement_percent = {1} exercise_progress_percent = {90}/>
        <SingleProgressBar exercise = "DEADLIFT" improvement_percent = {-1} exercise_progress_percent = {50}/>
        <SingleProgressBar exercise = "SHOULDER PRESS" improvement_percent = {3} exercise_progress_percent = {90}/>
      </Box>
    </CardContent>
  )
}

export default Tab1ONEProgress