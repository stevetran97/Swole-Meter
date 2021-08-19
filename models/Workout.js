const mongoose = require("mongoose")

const WorkoutSchema = new mongoose.Schema({
  time: Date,
  weight: Number,
  reps: Number,
  sets: Number,

  type: String, //ONE_REP or MULTI_REP
  creator: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
})

let Workout = mongoose.model("Workout", WorkoutSchema)
module.exports(Workout)