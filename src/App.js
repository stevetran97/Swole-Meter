import React from "react";

export default class App extends React.Component {
  state = {
    loading: true,
    workouts: [],
  };

  async componentDidMount() {
    const url = "http://localhost:8080/api/workouts";
    const response = await fetch(url, {
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    this.setState({
      loading: false,
      workouts: data,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <table>
              <tr>
                <th>Workout ID</th>
                <th>Date</th>
              </tr>
              {this.state.workouts.map((workout) => (
                <tr key={workout.ID}>
                  <td>{workout.ID}</td>
                  <td>{workout.date}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    );
  }
}
