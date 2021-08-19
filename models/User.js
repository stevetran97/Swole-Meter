const mongoose = require("mongoose");

// Passport for including User entry in the request via authentification
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: String, 
  firstName: String,
  lastName: String,
  password: String,
  profile: String,
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout"
    }
  ],
  personal_records: {
    one_rep: {
      best_squat_weight: Number,
      best_bench_weight: Number,
      best_deadlift_weight: Number,
      best_shoulderp_weight: Number
    },
    multi_rep: {
      best_squat_work: Number,
      best_bench_work: Number,
      best_deadlift_work: Number,
      best_shoulderp_work: Number
    }
  }
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);
module.exports = User;
