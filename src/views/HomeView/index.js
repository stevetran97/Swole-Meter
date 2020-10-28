import React from 'react';
// import PropTypes from 'prop-types'
import {
  makeStyles, Container, Grid 
} from '@material-ui/core'

import HomeProgressionWidget from "./Widgets/HomeProgressionWidget";
import SummaryChartWidget from "./Widgets/SummaryChartWidget";

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
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <HomeProgressionWidget/>
              </Grid> 
              <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
              >
                <SummaryChartWidget/>
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