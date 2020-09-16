import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import ExerciseTable from "./ExerciseTable";

export default function ExercisePageContent({ columns, table, chart }) {
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
          {<ExerciseTable columns={columns} sets={table} />}
        </Box>
      </Grid>
    </div>
  );
}
