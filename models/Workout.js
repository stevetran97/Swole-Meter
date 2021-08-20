// Each user has many workouts
const mongoose = require("mongoose");

let WorkoutSchema = new mongoose.Schema(
  {  
    _id: mongoose.Types.ObjectId,
    time: Date,

    type: String, //ONE_REP or MULTI_REP
    creator: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    },
  },
  {
    timestamps: true
  });

let Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;