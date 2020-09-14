import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

export default function MonthPicker({ dateCallback }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dateCallback(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          views={["month"]}
          helperText="Data for month..."
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
