const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    name: String,

    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
      }
    ],
    personal_records: {
      one_rep: {  //lb
        squat: Number,
        bench: Number,
        deadlift: Number,
        shoulder_press: Number
      },
      multi_rep: {  //lbxReps
        squat: Number,  
        bench: Number,  
        deadlift: Number,
        shoulder_press: Number
      }
    }
  }, 
  {
    timestamps: true
  }
);

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 * Use: Hashes (with bcrypt) new or modified passwords for current model.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) return next(saltError);

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      
      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
