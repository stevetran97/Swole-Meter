import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button, 
  Card,
  CardHeader, 
  Divider, 
  makeStyles,
} from '@material-ui/core';

// Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Custom Components
import Tab1ONEChart from './Components/Tab1ONEChart'
import Tab2REPChart from './Components/Tab2REPChart'
//  --------------------------------
//  --------------------------------
const useStyles = makeStyles(() => ({
  root:{}
}));
//  --------------------------------

const SummaryChartWidget  = ({className, ...rest})  =>  {
  const classes = useStyles();

  const [sumChartTabIdx, setSumChartTabIdx] = useState("scwONE"); 
  const [widgTitle, setWidgTitle] = useState("ONE REP MAX")

  const handleTabChange = (newTabID) => {
    setSumChartTabIdx(newTabID)
    if (newTabID === "scwONE") {setWidgTitle("ONE REP MAX")}
    else if (newTabID === "scwREP") {setWidgTitle("MULTI REP")}
  }

  return  (
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Box height={10}>
            <Button style={{size: "small", variant: "h6"} } id="scwONE" onClick={()=>{handleTabChange("scwONE")}}>ONE</Button>
            <Button style={{size: "small", variant: "h6"} } id="scwREP" onClick={()=>{handleTabChange("scwREP")}}>REP</Button>
          </Box>
        )}
        title = {`${widgTitle} RECORD`}
      />
      <Divider/> 
      {/* Tab Contents Conditional Render */}
      {sumChartTabIdx === "scwONE" && <Tab1ONEChart/>}
      {sumChartTabIdx === "scwREP" && <Tab2REPChart/>}
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={1}
        height={50}
      >
        <Button
          color='primary'
          endIcon={<ArrowDropDownIcon/>}
          size='small'
          variant='text'
        >
          Last xxx days
        </Button>
      </Box>
    </Card>
  );
};

//  --------------------------------
// Proptypes

SummaryChartWidget.propTypes = {
  className: PropTypes.string
};

export default SummaryChartWidget;