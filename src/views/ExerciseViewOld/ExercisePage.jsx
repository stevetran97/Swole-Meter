import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

import MonthPicker from "../Utils/MonthPicker";
import ExerciseTab from "./ExerciseTab";
import ExerciseTabPanel from "./ExerciseTabPanel";
import ExercisePageContent from "./ExercisePageContent";

export default function ExercisePage({ exercise }) {
  const theme = useTheme();

  // States
  const [date, setDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);
  const [workoutData, setWorkoutData] = useState({
    workouts: {
      data: [],
      chart: [],
    },
    prs: {
      data: [],
      chart: [],
    },
  });

  // Helpers
  const formatDataForChart = (data, field) => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push([data[i].date, data[i][field]]);
    }
    return arr;
  };

  // useEffects
  // Will fetch if user changes date.
  useEffect(() => {
    async function fetchExerciseData() {
      // Get Workout data into variables
      const workoutJSON = await fetchData({
        url: `http://${window.location.hostname}:8080/api/sets`,
        date: date,
        exercise: exercise,
      });

      const prJSON = await fetchData({
        url: `http://${window.location.hostname}:8080/api/prs`,
        date: date,
        exercise: exercise,
      });

      // Pull workout data into directly into state as data
      setWorkoutData({
        workouts: {
          data: workoutJSON,
          chart: formatDataForChart(workoutJSON, "predicted_max"),
        },
        prs: {
          data: prJSON,
          chart: formatDataForChart(prJSON, "weight"),
        },
      });
    }
    
    fetchExerciseData();
    // Add exercise as a dependency for use effect to stop console
    // from complaining. In practice, exercise will not change on
    // a specific exercise page, i.e. the "squat" page will have
    // "exercise = squat" and the "bench" page will have "exercise =
    // bench".
  }, [date, exercise]);

  // Primary Excercise Page Component Return
  return (
    <Grid item container>
      <Grid item xs={false} sm={1} md={2} xl={3} />
      <Grid item xs={12} sm={10} md={8} xl={6}>
        <Grid item>
          <Box ml={2}>
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
            <ExercisePageContent
              columns={workoutColumns}
              tabIdx={0}
              uuid={"set_id"}
              table={workoutData.workouts.data}
              chartOpts={libOpts({
                title: {
                  text: "Predicted Max",
                  display: true,
                },
              })}
              chart={workoutData.workouts.chart}
            />
          </ExerciseTabPanel>
          <ExerciseTabPanel value={tabIndex} index={1} dir={theme.direction}>
            <ExercisePageContent
              columns={workoutColumns}
              tabIdx={1}
              uuid={"set_id"}
              table={workoutData.workouts.data}
            />
          </ExerciseTabPanel>
          <ExerciseTabPanel value={tabIndex} index={2} dir={theme.direction}>
            <ExercisePageContent
              columns={prColumns}
              tabIdx={2}
              uuid={"pr_id"}
              table={workoutData.prs.data}
              chartOpts={libOpts({
                title: {
                  text: "PRs",
                  display: true,
                },
              })}
              chart={workoutData.prs.chart}
            />
          </ExerciseTabPanel>
        </SwipeableViews>
      </Grid>
      <Grid item xs={false} sm={1} md={2} xl={3} />
    </Grid>
  );
}

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

// libOpts returns an object that used to format the "LineChart"
// component from the "react-chartkick" module. Additional options
// could be passed in as an object to add features as desired.
//
// e.g.
// {
//   title: {...},
//   legdend: {...},
// }
function libOpts(opts) {
  const obj = {
    library: {
      layout: {
        padding: {
          top: 20,
          left: 0,
          right: 10,
        },
      },
      ...opts,
    },
  };
  return obj;
}

// workoutColumns is the column headers and id for the ExerciseComponent
// React Component.
//
// This is passed down as props from ExercisePage -> ExercisePageContent
// -> Exercise Table.
const workoutColumns = [
  { id: "date", label: "Name" },
  { id: "exercise", label: "Exercise" },
  { id: "weight", label: "Weight" },
  { id: "reps", label: "Reps" },
  { id: "rpe", label: "RPE" },
  { id: "predicted_max", label: "Predicted Max" },
];

// prColumns is the column headers and id for the ExerciseComponent
// React Component.
//
// This is passed down as props from ExercisePage -> ExercisePageContent
// -> Exercise Table.
const prColumns = [
  { id: "date", label: "Date" },
  { id: "weight", label: "Weight" },
];
