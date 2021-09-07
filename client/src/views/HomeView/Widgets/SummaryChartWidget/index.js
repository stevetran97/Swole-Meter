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
import BarChartTab from './Components/BarChartTab'

const useStyles = makeStyles(() => ({
  root:{}
}));

// --------------------------------
// Staged Data
const dataONE = {
  datasets: [
    // Each object is one exercise
    {
      backgroundColor: 'rgba(0, 65, 179, 0.91)',
      // Array of all weights lifted for squat
      data: [{x:'2020-11-1', y:300}, {x:'2020-11-2', y:310}, {x:'2020-11-3', y:330}, {x:'2020-11-4', y:350}],
      label:'Squat (lb)'
    },
    {
      backgroundColor: 'rgba(48, 95, 176, 0.8)',
      // Array of all weights lifted for Bench
      data: [{x:'2020-11-1', y:200}, {x:'2020-11-2', y:220}, {x:'2020-11-3', y:230}, {x:'2020-11-4', y:260}],
      label:'Bench Press (lb)'
    },
    {
      backgroundColor: 'rgba(29, 105, 237, 0.67)',
      // Array of all weights lifted for Deadlift
      data: [{x:'2020-11-1', y:390}, {x:'2020-11-2', y:410}, {x:'2020-11-3', y:450}, {x:'2020-11-4', y:480}],
      label:'Deadlift (lb)'
    },
    {
      backgroundColor: 'rgba(29, 105, 170, 0.9)',
      // Array of all weights lifted for Shoulder Press
      data: [{x:'2020-11-1', y:210}, {x:'2020-11-2', y:220}, {x:'2020-11-3', y:250}, {x:'2020-11-4', y:270}],
      label:'Shoulder Press (lb)'
    }
  ],
};

const dataREP = {
  datasets: [
    // Each object is one exercise
    {
      backgroundColor: 'rgba(0, 65, 179, 0.91)',
      // Array of all weights lifted for squat
      data: [{x:'2020-11-1', y:1200}, {x:'2020-11-2', y:1400}, {x:'2020-11-3', y:1600}, {x:'2020-11-4', y:1800}],
      label:'Squat (lb x Reps)'
    },
    {
      backgroundColor: 'rgba(48, 95, 176, 0.8)',
      // Array of all weights lifted for Bench
      data: [{x:'2020-11-1', y:800}, {x:'2020-11-2', y:1000}, {x:'2020-11-3', y:1200}, {x:'2020-11-4', y:1600}],
      label:'Bench Press (lb x Reps)'
    },
    {
      backgroundColor: 'rgba(29, 105, 237, 0.67)',
      // Array of all weights lifted for Deadlift
      data: [{x:'2020-11-1', y:900}, {x:'2020-11-2', y:1800}, {x:'2020-11-3', y:2100}, {x:'2020-11-4', y:2400}],
      label:'Deadlift (lb x Reps)'
    },
    {
      backgroundColor: 'rgba(29, 105, 170, 0.9)',
      // Array of all weights lifted for Shoulder Press
      data: [{x:'2020-11-1', y:200}, {x:'2020-11-2', y:400}, {x:'2020-11-3', y:800}, {x:'2020-11-4', y:1400}],
      label:'Shoulder Press (lb x Reps)'
    }
  ],
};
// --------------------------------



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
      {sumChartTabIdx === "scwONE" && <BarChartTab data={dataONE} workoutUnits="Pounds"/>}
      {sumChartTabIdx === "scwREP" && <BarChartTab data={dataREP} workoutUnits="Pounds x Reps"/>}
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