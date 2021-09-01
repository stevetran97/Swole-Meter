// Each workout has many exerciies
const mongoose = require('mongoose')

let ExerciseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  exercise: String, // bench, squat, deadlift, or shoulderpress
  style: String,  // ONE_rep or MULTI_REP
  weight: Number,
  reps: Number,
  sets: Number,
})

module.exports = mongoose.model("Exercise", ExerciseSchema);