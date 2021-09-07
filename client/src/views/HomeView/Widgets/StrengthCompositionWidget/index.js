import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import {
  makeStyles, 
  Card,
  CardHeader,
  Divider,
  Box,
  Button
} from '@material-ui/core'

// Custom Components
import RadarTab from './Components/RadarTab'

// Styles
const useStyles = makeStyles(() => ({
  root:{
    display: 'block',
    transitionDuration: '0.3s',
    height: "100%"
  }
}));

// ---------------------------------
// Staged Data
// ONE REP RADAR CHART STRENGTH COMPOSITION DATA
const dataONE = {
  labels: ['SQUAT', 'BENCH', 'DEADLIFT', 'SHOULDER PRESS'],
  datasets: [
    {
      label: 'LB',
      data: [2500, 3000, 3500, 6000],
      backgroundColor: 'rgba(21, 88, 203, 0.6)',
      borderWidth: 1,
    },
  ],
}

// MULTI REP RADAR CHART STRENGTH COMPOSITION DATA
const dataREP = {
  labels: ['SQUAT', 'BENCH', 'DEADLIFT', 'SHOULDER PRESS'],
  datasets: [
    {
      label: 'LB x REP',
      data: [1000, 2200, 4000, 8000],
      backgroundColor: 'rgba(21, 88, 203, 0.6)',
      borderWidth: 1,
    },
  ],
}

// ONE AND MULTI REP RADAR CHART STRENGTH COMPOSITION DATA
const dataTOT = {
  labels: ['SQUAT', 'BENCH', 'DEADLIFT', 'SHOULDER PRESS'],
  datasets: [
    {
      label: 'LB x REP',
      data: [3500, 5200, 7500, 14000],
      backgroundColor: 'rgba(21, 88, 203, 0.6)',
      borderWidth: 1,
    },
  ],
}
// ---------------------------------


// Primary Widget Function
const StrengthCompositionWidget = ({className, ...rest}) => {
  // Create styles within the function
  const classes = useStyles();

  // States
  const [strCompTabIdx, setStrCompTabIdx] = useState("stcwONE")
  const [strCompTitle, setStrCompTitle] = useState("ONE REP MAX")

  const handleChangeTab = (newTabIdx) => {
    setStrCompTabIdx(newTabIdx)

    switch(newTabIdx) {
      case "stcwONE":
        setStrCompTitle("ONE REP")
        break;
      case "stcwREP":
        setStrCompTitle("MULTI REP")
        break;
      case "stcwTOT":
        setStrCompTitle("TOTAL")
        break;
      default:
    }
  }

  // Returned widget
  return(
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title = {strCompTitle + " WORK"}
        height={10}
      />
      <Divider/>
      {strCompTabIdx === "stcwONE" && <RadarTab data={dataONE} />} 
      {strCompTabIdx === "stcwREP" && <RadarTab data={dataREP} />} 
      {strCompTabIdx === "stcwTOT" && <RadarTab data={dataTOT} />} 
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={1}
        height={50}
      >
        <Button style={{size: "small", variant: "h6"}} onClick={()=>{handleChangeTab("stcwONE")}}>
          ONE
        </Button>
        <Button style={{size: "small", variant: "h6"}} onClick={()=>{handleChangeTab("stcwREP")}}>
          REP
        </Button>
        <Button style={{size: "small", variant: "h6"}} onClick={()=>{handleChangeTab("stcwTOT")}}>
          TOT
        </Button>
      </Box>
    </Card> 
  )
}

StrengthCompositionWidget.propTypes = {
  className: PropTypes.string
};

export default StrengthCompositionWidget;