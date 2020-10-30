import React from 'react';
// import PropTypes from 'prop-types'
import {
  makeStyles, Container, Grid 
} from '@material-ui/core'

import HomeProgressionWidget from "./Widgets/HomeProgressionWidget";
import SummaryChartWidget from "./Widgets/SummaryChartWidget";
import StrengthCompositionWidget from "./Widgets/StrengthCompositionWidget"

import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const HomeView = ({className, ...rest})  => {
  const classes = useStyles();

  return (
      <Page className = {classes.root}
        title = "Dashboard"
      >
        <Container maxWidth = {false}>
            <Grid
              container
              spacing = {3}
            >
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={12}
              >
                <HomeProgressionWidget/>
              </Grid> 
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={6}
              >
                <StrengthCompositionWidget/>
              </Grid>  

              {/* New Row */}
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <SummaryChartWidget exercisestyle='ONE REP MAX'/>
              </Grid>    
            </Grid>
        </Container>
      </Page>
 
  )
}

// HomeView.propTypes = {
//   className: PropTypes.string
// }
export default HomeView


//CardContent, Grid, LinearProgress, Typography, Avatar, Box,