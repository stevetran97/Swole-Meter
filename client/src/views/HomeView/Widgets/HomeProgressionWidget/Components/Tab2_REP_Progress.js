import React from 'react'

import { CardContent, Box, useTheme } from '@material-ui/core'


// Custom Components 
import SingleProgressBar from './Components/SingleProgressBar'

const Tab2_REP_Progress = () => {



  return(
    <CardContent>
      <Box
        height={500}
        position="relative"
      >
        <SingleProgressBar exercise = "SQUAT" improvement_percent = {3} exercise_progress_percent = {40}/>
        <SingleProgressBar exercise = "BENCH PRESS" improvement_percent = {4} exercise_progress_percent = {100}/>
        <SingleProgressBar exercise = "DEADLIFT" improvement_percent = {-5} exercise_progress_percent = {50}/>
        <SingleProgressBar exercise = "SHOULDER PRESS" improvement_percent = {7} exercise_progress_percent = {20}/>
      </Box>
    </CardContent>
  )
}


export default Tab2_REP_Progress