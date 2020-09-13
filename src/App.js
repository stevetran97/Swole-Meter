import React from "react";

export default class App extends React.Component {
  state = {
    loading: true,
    workouts: [],
    prs: [],
    setData: [],
  };

  async componentDidMount() {
    const urlWorkouts = "http://localhost:8080/api/workouts";
    const workoutResponse = await fetch(urlWorkouts, {
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "json",
        "Content-Type": "application/json",
      },
    });
    console.log("GET");

    const workoutData = await workoutResponse.json();

    const urlPrs = "http://localhost:8080/api/prs";
    const prResponse = await fetch(urlPrs, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise: "squat",
        year: "2020",
        month: "9",
      }),
    });
    console.log("GET");

    const prData = await prResponse.json();

    const urlSetsPayload = "http://localhost:8080/api/sets";
    const workoutPayloadResponse = await fetch(urlSetsPayload, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise: "squat",
        year: "2020",
        month: "9",
      }),
    });
    console.log("POST");

    const setData = await workoutPayloadResponse.json();

    this.setState({
      loading: false,
      workouts: workoutData,
      prs: prData,
      setData: setData,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Your workout history</h1>
            <table>
              <thead>
                <tr>
                  <th>Workout ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.workouts.map((workout) => (
                  <tr key={workout.workout_id}>
                    <td>{workout.workout_id}</td>
                    <td>{workout.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Your Records</h1>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Exercise</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prs.map((pr) => (
                  <tr key={pr.pr_id}>
                    <td>{pr.date}</td>
                    <td>{pr.exercise}</td>
                    <td>{pr.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Your Sets</h1>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Exercise</th>
                  <th>Weight</th>
                  <th>Reps</th>
                  <th>RPE</th>
                </tr>
              </thead>
              <tbody>
                {this.state.setData.map((set) => (
                  <tr key={set.set_id}>
                    <td>{set.date}</td>
                    <td>{set.exercise}</td>
                    <td>{set.weight}</td>
                    <td>{set.reps}</td>
                    <td>{set.rpe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
