import React from 'react';
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
import Tab1_ONE_Chart from './Components/Tab1_ONE_Chart'
//  --------------------------------
//  --------------------------------

const useStyles = makeStyles(() => ({
  root:{}
}));
//  --------------------------------

const SummaryChartWidget  = (exercisestyle, {className, ...rest})  =>  {
  const classes = useStyles();

  const [HomeChartTab, setHomeChartTab] = React.useState(0); 
  const handleHomeChartTabChange = (event, newHomeChartTab) => {
    setHomeChartTab(newHomeChartTab)
  }

  return  (
    <Card
      className = {clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <>
            <Button style={{size: "small", variant: "h6"}} >ONE</Button>
            <Button style={{size: "small", variant: "h6"}} >MUL</Button>
          </>
        )}
        
        title = {exercisestyle.exercisestyle + ' ' +'RECORD'}
      />
      <Divider/> 
      {/* Tab Contents here */}
      <Tab1_ONE_Chart/>

      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
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