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
  }, [date]);

  return (
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
            <ExercisePageContent
              columns={workoutColumns}
              tabIdx={0}
              uuid={"set_id"}
              table={workoutData.workouts.data}
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
