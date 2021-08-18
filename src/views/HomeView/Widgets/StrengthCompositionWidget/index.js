import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import { Radar } from 'react-chartjs-2'
import {
  makeStyles, 
  useTheme,   
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Button
} from '@material-ui/core'

// ---------------------------------
// Custom Components
import Tab1_ONE_Composition from './Components/Tab1_ONE_Composition'
import Tab2_REP_Composition from './Components/Tab2_REP_Composition'
import Tab3_TOT_Composition from './Components/Tab3_TOT_Composition'

// ----------------------------------------------------------------
// Styles
// Applies base style to the page
const useStyles = makeStyles(() => ({
  root:{}
}));

// Modified card style. Only card related
var cardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: "100%",
}

// ----------------------------------------------------------------
// Primary Widget Function
const StrengthCompositionWidget = ({className, ...rest}) => {
  // Create styles within the function
  const classes = useStyles();
  const theme = useTheme();

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
      style = {cardStyle}
    >
      <CardHeader
        title = {strCompTitle + " WORK"}
        height={10}
      />
      <Divider/>

      {strCompTabIdx=="stcwONE" && <Tab1_ONE_Composition/>} 
      {strCompTabIdx=="stcwREP" &&<Tab2_REP_Composition/>} 
      {strCompTabIdx=="stcwTOT" &&<Tab3_TOT_Composition/>} 

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