import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";
import { LineChart } from "react-chartkick";
import "chart.js";
import Menu from "./components/Layout/Menu";
import StickyTable from "./components/Layout/Table";
import MonthPicker from "./components/Utils/MonthPicker";

class App extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      loading: true,
      exercise: "squat",
      sets: [],
      chartData: [],
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    };
  }

  dateCallback = async (date) => {
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });

    console.log(this.state.month);

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
        year: this.state.year.toString(),
        month: this.state.month.toString(),
      }),
    });

    const sets = await setsResponse.json();

    this.setState({
      loading: false,
      sets: sets,
      chartData: this.makeChartData(sets),
    });
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
        year: this.state.year.toString(),
        month: this.state.month.toString(),
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
      <Grid container direction="column">
        <Grid item>
          <Menu />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} md={2} xl={3} />
          <Grid item xs={12} sm={10} md={8} xl={6}>
            <Grid item>
              <Box mt={4}>
                <MonthPicker dateCallback={this.dateCallback} />
              </Box>
            </Grid>
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
    );
  }
}

export default App;
