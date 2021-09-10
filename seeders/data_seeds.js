let mongoose = require("mongoose");

// Generate Unique Ids
// Configs
const NUM_USER_ID_GEN = 2
const NUM_WORKOUT_ID_GEN = 2
const NUM_EXERCISE_ID_GEN = 5


const userIdArr = new Array(NUM_USER_ID_GEN);
for (let i = 0; i < userIdArr.length; i++) {
  userIdArr[i] = new mongoose.Types.ObjectId()
};

const workoutIdArr = new Array(NUM_WORKOUT_ID_GEN);
for (let i = 0; i < workoutIdArr.length; i++) {
  workoutIdArr[i] = new mongoose.Types.ObjectId()
};

const exerciseIdArr = new Array(NUM_EXERCISE_ID_GEN)
for (let i = 0; i < exerciseIdArr.length; i++) {
  exerciseIdArr[i] = new mongoose.Types.ObjectId()
};


// Id Array definition for seeding
let userSeed = [
  {
    _id: userIdArr[0],
    username: "steviewonder97",
    password: "123456",
    email: "steve11111@hotmail.org",
    workouts: [workoutIdArr[0], workoutIdArr[1]]
  },
  {
    _id: userIdArr[1],
    username: "willywonka87",
    password: "123456",
    email: "willy1234@live.ca"
  },
];

let workoutSeed = [
  { _id: workoutIdArr[0],
    testAttrb: "WORKOUT1TEST",
    exercises: [exerciseIdArr[0], exerciseIdArr[1], exerciseIdArr[2]]
  },
  {
    _id: workoutIdArr[1],
    testAttrb: "WORKOUT2 TEST",
    exercises: [exerciseIdArr[3], exerciseIdArr[4]]
  }
]

let exerciseSeed = [
  { 
    _id: exerciseIdArr[0], 
    exercise: "BenchPress",
    style: "MULTI_REP",
    weight: "300",
    reps: "1",
    sets: "3"
  }, 
  { 
    _id: exerciseIdArr[1], 
    exercise: "BenchPress",
    style: "ONE_REP",
    weight: "300",
    reps: "1",
    sets: "3"
  }, 
  { 
    _id: exerciseIdArr[2], 
    exercise: "BenchPress",
    style: "ONE_REP",
    weight: "300",
    reps: "1",
    sets: "3"
  }, 
  { 
    _id: exerciseIdArr[3], 
    exercise: "Squat",
    style: "ONE_REP",
    weight: "300",
    reps: "1",
    sets: "3"
  }, 
  { 
    _id: exerciseIdArr[4], 
    exercise: "ShoulderPress",
    style: "MULTI_REP",
    weight: "300",
    reps: "6",
    sets: "3"
  }, 
]

module.exports = {
  userSeed: userSeed,
  workoutSeed: workoutSeed,
  exerciseSeed: exerciseSeed
}