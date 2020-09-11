import React from "react";

export default class App extends React.Component {
  state = {
    loading: true,
    workouts: [],
    prs: [],
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

    const workoutData = await workoutResponse.json();

    const urlPrs = "http://localhost:8080/api/prs";
    const prResponse = await fetch(urlPrs, {
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "json",
        "Content-Type": "application/json",
      },
    });

    const prData = await prResponse.json();

    this.setState({
      loading: false,
      workouts: workoutData,
      prs: prData,
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
                  <tr key={workout.ID}>
                    <td>{workout.ID}</td>
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
      </div>
    );
  }
}
