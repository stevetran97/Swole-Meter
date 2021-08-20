// Each workout has many exerciies
const mongoose = require('mongoose')

let ExerciseSchema = new mongoose.Schema({
  exercise: String, // bench, squat, deadlift, or shoulderpress
  style: String,  // ONE_rep or MULTI_REP

  weight: Number,
  reps: Number,
  sets: Number,
  creator: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
})

let Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = Exercise;