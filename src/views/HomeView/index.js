import React from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types'
import {
  Card,  makeStyles, Container, Grid 
} from '@material-ui/core'

import HomeProgressionWidget from "./Widgets/HomeProgressionWidget";

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