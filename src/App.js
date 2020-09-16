import React from "react";
import { Grid } from "@material-ui/core";
import Menu from "./components/Layout/Menu.jsx";
import ExercisePage from "./components/Layout/ExercisePage.jsx";

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Menu />
      </Grid>
      <ExercisePage exercise={"squat"} />
    </Grid>
  );
}

export default App;
