import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import ExerciseTable from "./ExerciseTable";

// Props:
//  - columns: column name and id that defines the data the
//             ExerciseTable will hold.
//  - tabIdx:  This differentiates the "id" value of the table row
//             else React complains. This depends on the tab we're on.
//  - uuid:    Unique identifier for each data row. E.g. for sets, this
//             will be the set id.
//  - table:   The list of data for the ExerciseTable.
//  - chart:   The list of data formatted as datapoints (x,y) that
//             the LineGraph will display.
export default function ExercisePageContent({
  columns,
  tabIdx,
  uuid,
  table,
  chart,
}) {
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
          {
            <ExerciseTable
              columns={columns}
              tabIdx={tabIdx}
              uuid={uuid}
              data={table}
            />
          }
        </Box>
      </Grid>
    </div>
  );
}
