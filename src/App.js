import React, { useEffect, useState } from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import Menu from "./components/Layout/Menu";
import StickyTable from "./components/Layout/Table";
import MonthPicker from "./components/Utils/MonthPicker";

function App() {
  const exercise = "squat";
  const [workoutData, setWorkoutData] = useState({
    sets: [],
    chartData: [],
  });
  const [date, setDate] = useState(new Date());

  const formatSetsToChart = (sets) => {
    let arr = [];
    for (let i = 0; i < sets.length; i++) {
      arr.push([sets[i].date, sets[i].predicted_max]);
    }
    return arr;
  };

  useEffect(() => {
    async function fetchWorkoutData() {
      const response = await fetch(
        `http://${window.location.hostname}:8080/api/sets`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise: exercise,
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString(),
          }),
        }
      );

      const data = await response.json();

      setWorkoutData({
        sets: data,
        chartData: formatSetsToChart(data),
      });
    }
    fetchWorkoutData();
  }, [date]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Menu />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} md={2} xl={3} />
        <Grid item xs={12} sm={10} md={8} xl={6}>
          <Grid item>
            <Box mt={4} ml={2}>
              <MonthPicker date={date} setDate={setDate} />
            </Box>
          </Grid>
          {/* Define content here*/}
          <Grid item>
            <Box mt={4} mx={2}>
              <Paper elevation={3}>
                <LineChart
                  ytitle="Weight (lbs)"
                  data={workoutData.chartData}
                  library={{
                    layout: {
                      padding: {
                        top: 20,
                        left: 0,
                        right: 10,
                      },
                    },
                  }}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={4} mb={2} mx={2}>
              <StickyTable sets={workoutData.sets} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={1} md={2} xl={3} />
      </Grid>
    </Grid>
  );
}

export default App;
