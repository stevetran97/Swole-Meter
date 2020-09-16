import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import Menu from "./components/Layout/Menu";
import MonthPicker from "./components/Utils/MonthPicker";
import ExerciseTab from "./components/Layout/ExerciseTab";
import ExerciseTabPanel from "./components/Layout/ExerciseTabPanel";
import ExercisePageContent from "./components/Layout/ExercisePageContent";

// obj = {url: string, exercise: string, date: date}
async function fetchData(obj) {
  const { url, exercise, date } = obj;
  const response = await fetch(url, {
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
  });

  const data = await response.json();
  return data;
}

function App() {
  const theme = useTheme();
  const exercise = "squat";
  const [workoutData, setWorkoutData] = useState({
    sets: [],
    chartData: [],
  });
  const [prData, setPRData] = useState({
    prs: [],
    chartData: [],
  });
  const [date, setDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);

  const formatDataForChart = (data, field) => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push([data[i].date, data[i][field]]);
    }
    return arr;
  };

  // Will fetch if user changes date.
  useEffect(() => {
    async function fetchExerciseData() {
      const workoutData = await fetchData({
        url: `http://${window.location.hostname}:8080/api/sets`,
        date: date,
        exercise: exercise,
      });

      const prData = await fetchData({
        url: `http://${window.location.hostname}:8080/api/prs`,
        date: date,
        exercise: exercise,
      });

      setWorkoutData({
        sets: workoutData,
        chartData: formatDataForChart(workoutData, "predicted_max"),
      });
      setPRData({
        pr: prData,
        chartData: formatDataForChart(prData, "weight"),
      });
    }
    fetchExerciseData();
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
              <ExerciseTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </Box>
          </Grid>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabIndex}
            onChangeIndex={(index) => setTabIndex(index)}
          >
            <ExerciseTabPanel value={tabIndex} index={0} dir={theme.direction}>
              {/* Define content here*/}
              <ExercisePageContent {...workoutData} />
            </ExerciseTabPanel>
            <ExerciseTabPanel value={tabIndex} index={1} dir={theme.direction}>
              Panel data in Panel 2
            </ExerciseTabPanel>
            <ExerciseTabPanel value={tabIndex} index={2} dir={theme.direction}>
              Panel data in Panel 3
            </ExerciseTabPanel>
          </SwipeableViews>
        </Grid>
        <Grid item xs={false} sm={1} md={2} xl={3} />
      </Grid>
    </Grid>
  );
}

export default App;
