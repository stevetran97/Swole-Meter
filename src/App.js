import React, { useEffect, useState } from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import Menu from "./components/Layout/Menu";
import StickyTable from "./components/Layout/Table";
import MonthPicker from "./components/Utils/MonthPicker";
import ExerciseTabs from "./components/Layout/ExerciseTabs";

function App() {
  const exercise = "squat";
  const [workoutData, setWorkoutData] = useState({
    sets: [],
    chartData: [],
  });
  const [date, setDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);
  const [prData, setPRData] = useState({
    prs: [],
    chartData: [],
  });

  const formatDataForChart = (data, field) => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push([data[i].date, data[i][field]]);
    }
    return arr;
  };

  // Will fetch if user changes date.
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
        chartData: formatDataForChart(data, "predicted_max"),
      });
    }
    fetchWorkoutData();
  }, [date]);

  // Will fetch if user changes date.
  useEffect(() => {
    async function fetchPRData() {
      const response = await fetch(
        `http://${window.location.hostname}:8080/api/prs`,
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
      setPRData({
        prs: data,
        chartData: formatDataForChart(data, "weight"),
      });
    }
    fetchPRData();
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
          <Grid item>
            <Box mt={2} mx={2}>
              <ExerciseTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
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
            <Box mt={4} mx={2}>
              <Paper elevation={3}>
                <LineChart
                  ytitle="Weight (lbs)"
                  data={prData.chartData}
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
