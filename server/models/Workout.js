const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutSchema = new Schema({
  workoutTitle: {
    type: String,
    required: 'You need a name for the workout!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  workoutText: {
    type: String,
    required: 'You need a description for the workout!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  workoutAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  exercise: [
    {
      details: {
        type: String,
        maxlength: 280
      }
    }
  ],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
