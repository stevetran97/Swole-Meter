let mongoose = require("mongoose");
const User = require("../server/models/User");
const Workout = require("../server/models/Workout");
const Exercise = require("../server/models/Exercise");

const config = require('../config');

const { userSeed, workoutSeed, exerciseSeed } = require('./data_seeds')

mongoose.connect(config.dbUri);

// Deletes all Workout and User seeds
User.deleteMany({})
  .then(Workout.deleteMany({}))
  // Creates user, workout, and exercise seeds seeds
  .then(()=>Workout.insertMany(workoutSeed))
  .then(()=>Exercise.insertMany(exerciseSeed))
  .then(()=>User.insertMany(userSeed))
  .then(data=>{

    const user1workoutRefs = data[0].workouts
    user1workoutRefs.forEach(workoutId=>{
      Workout.findById(workoutId).then(workoutData =>  {
        console.log("Current Workout: ", workoutId)
        console.log("Found workoutData!: ", workoutData.exercises)
      });
    });

    process.exit(0)
  })
  .catch(err=>{
    console.log("[INFO]User Seeding error:", err)
    process.exit(1)
  })
  
  
  



