import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import StickyTable from "./Table";

export default function ExercisePageContent({ table, chart }) {
  return (
    <div>
      <Grid item>
        <Box mt={4} mx={2}>
          <Paper elevation={3}>
            <LineChart
              ytitle="Weight (lbs)"
              data={chart}
              library={{
                layout: {
                  padding: {
                    top: 20,
                    left: 0,
                    right: 10,
                  },
                },
                title: {
                  text: "Predicted Max",
                  display: true,
                },
              }}
            />
          </Paper>
        </Box>
      </Grid>
      <Grid item>
        <Box mt={4} mb={2} mx={2}>
          {<StickyTable sets={table} />}
        </Box>
      </Grid>
    </div>
  );
}
