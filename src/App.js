import React from "react";
import BasePage from "./components/Layout/BasePage.jsx";
import ExercisePage from "./components/ExerciseLayout/ExercisePage.jsx";

function App() {
  return (
    <BasePage>
      <ExercisePage exercise={"squat"} />
    </BasePage>
  );
}

export default App;
