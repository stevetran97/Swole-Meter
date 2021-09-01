// Each user has many workouts
const mongoose = require("mongoose");

let WorkoutSchema = new mongoose.Schema(
  {  
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);