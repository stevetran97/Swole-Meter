import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { LineChart } from "react-chartkick";
import "chart.js";
import Menu from "./components/Layout/Menu";
import StickyTable from "./components/Layout/Table";

class App extends React.Component {
  theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  state = {
    loading: true,
    exercise: "squat",
    sets: [],
    chartData: [],
  };

  makeChartData = (sets) => {
    let data = [];
    for (let i = 0; i < sets.length; i++) {
      data.push([sets[i].date, sets[i].predicted_max]);
    }
    return data;
  };

  async componentDidMount() {
    const setsUrl = "http://localhost:8080/api/sets";
    const setsResponse = await fetch(setsUrl, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise: "squat",
        year: "2020",
        month: "9",
      }),
    });

    const sets = await setsResponse.json();

    this.setState({
      loading: false,
      sets: sets,
      chartData: this.makeChartData(sets),
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Paper style={{ height: "100vh" }}>
          <Grid container direction="column">
            <Grid item>
              <Menu />
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={1} md={2} xl={3} />
              <Grid item xs={12} sm={10} md={8} xl={6}>
                {/* Define content here*/}
                <Grid item>
                  <Box mt={4}>
                    <Paper elevation={3}>
                      <LineChart
                        ytitle="Weight (lbs)"
                        data={this.state.chartData}
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
                  <Box mt={4}>
                    <StickyTable sets={this.state.sets} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={false} sm={1} md={2} xl={3} />
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;

// export default class App extends React.Component {
//   state = {
//     loading: true,
//     workouts: [],
//     prs: [],
//     setData: [],
//   };

//   async componentDidMount() {
//     const urlWorkouts = "http://localhost:8080/api/workouts";
//     const workoutResponse = await fetch(urlWorkouts, {
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         Accept: "json",
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("GET");

//     const workoutData = await workoutResponse.json();

//     const urlPrs = "http://localhost:8080/api/prs";
//     const prResponse = await fetch(urlPrs, {
//       mode: "cors",
//       credentials: "include",
//       method: "POST",
//       headers: {
//         Accept: "json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         exercise: "squat",
//         year: "2020",
//         month: "9",
//       }),
//     });
//     console.log("GET");

//     const prData = await prResponse.json();

//     const urlSetsPayload = "http://localhost:8080/api/sets";
//     const workoutPayloadResponse = await fetch(urlSetsPayload, {
//       mode: "cors",
//       credentials: "include",
//       method: "POST",
//       headers: {
//         Accept: "json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         exercise: "squat",
//         year: "2020",
//         month: "9",
//       }),
//     });
//     console.log("POST");

//     const setData = await workoutPayloadResponse.json();

//     this.setState({
//       loading: false,
//       workouts: workoutData,
//       prs: prData,
//       setData: setData,
//     });
//   }

//   render() {
//     return (
//       <div>
//         {this.state.loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             <h1>Your workout history</h1>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Workout ID</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.workouts.map((workout) => (
//                   <tr key={workout.workout_id}>
//                     <td>{workout.workout_id}</td>
//                     <td>{workout.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {this.state.loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             <h1>Your Records</h1>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Exercise</th>
//                   <th>Weight</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.prs.map((pr) => (
//                   <tr key={pr.pr_id}>
//                     <td>{pr.date}</td>
//                     <td>{pr.exercise}</td>
//                     <td>{pr.weight}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {this.state.loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             <h1>Your Sets</h1>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Exercise</th>
//                   <th>Weight</th>
//                   <th>Reps</th>
//                   <th>RPE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.setData.map((set) => (
//                   <tr key={set.set_id}>
//                     <td>{set.date}</td>
//                     <td>{set.exercise}</td>
//                     <td>{set.weight}</td>
//                     <td>{set.reps}</td>
//                     <td>{set.rpe}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
