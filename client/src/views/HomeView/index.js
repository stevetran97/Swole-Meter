import React from 'react';
import PropTypes from 'prop-types'
import {
  makeStyles, Container, Grid
} from '@material-ui/core'

import Page from '../../components/Page';

//  --------------------------------
// Custom Components
import HomeProgressionWidget from "./Widgets/HomeProgressionWidget";
import SummaryChartWidget from "./Widgets/SummaryChartWidget";
import StrengthCompositionWidget from "./Widgets/StrengthCompositionWidget"
//  --------------------------------

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

//  --------------------------------
// Main Dashboard Component
const HomeView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          {/* Top Row */}
          <Grid
            item
            lg={6}
            sm={12}
            xl={6}
            xs={12}
          >
            <HomeProgressionWidget />
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            xl={6}
            xs={12}
          >
            <StrengthCompositionWidget />
          </Grid>

          {/* New Row */}
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <SummaryChartWidget/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

HomeView.propTypes = {
  className: PropTypes.string
}
export default HomeView

