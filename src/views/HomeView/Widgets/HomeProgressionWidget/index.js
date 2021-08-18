import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import {
  Card, CardContent,  makeStyles, CardHeader, Button, Typography, Divider, Box
} from '@material-ui/core'

// Custom Components
import Tab1_ONE_Progress from "./Components/Tab1_ONE_Progress.js";
import Tab2_REP_Progress from "./Components/Tab2_REP_Progress.js";



// Styles
const useStyles = makeStyles((theme) => ({
  root: {},
}));

// Modified card style. Only card related
var cardStyle = {
  display: 'block',
  transitionDuration: '0.3s'
}

// Primary Component: Progression Widget
const HomeProgressionWidget = ({className, ...rest})  => {
  const classes = useStyles();

  // States
  const [progTabIdx, setProgTabIdx] = useState("hpwONE")
  const [progWidgTitle, setProgWidgTitle] = useState("ONE REP MAX")

  // Helpers
  const handleTabChange = (newTabIdx) => {
    setProgTabIdx(newTabIdx)

    if (newTabIdx == "hpwONE") {setProgWidgTitle("ONE REP MAX")}
    else if (newTabIdx == "hpwREP") {setProgWidgTitle("MULTI REP")}
  }

  return (
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
      style = {cardStyle}
    >
      <CardHeader
        title = {progWidgTitle + ' PROGRESSION'}
        action={(
          <>
            <Box m={1} height={10}>
              <Typography 
                color = 'textSecondary'
                variant = "caption"
              >
                This Month
              </Typography>    
            </Box>
          </>
        )}
      />
      <Divider/>
        {progTabIdx=="hpwONE" && <Tab1_ONE_Progress/>}
        {progTabIdx=="hpwREP" && <Tab2_REP_Progress/>}
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={1}
        height={50}
      >
        <Button style={{size: "small", variant: "h6"}} onClick={()=>{handleTabChange("hpwONE")}}>
          ONE
        </Button>
        <Button style={{size: "small", variant: "h6"}} onClick={()=>{handleTabChange("hpwREP")}}>
          REP
        </Button>
      </Box>
    </Card>
  )
}

HomeProgressionWidget.propTypes = {
  className: PropTypes.string
}
export default HomeProgressionWidget



// Takes the Maximum Score of your current month and compares that to your last goal
// Tells you how much your maximum of this month has improved 

// Set new goal automatically takes the largest score and generates a slightly higher goal
