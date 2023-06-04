const { Schema, model } = require('mongoose');

const cardioSchema = new Schema({
  exercise: {
    type: String,
    required: 'Please enter an exercise!',
  },
  miles: {
    type: Number,
    required: true
  },
  minutes: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  });

const Cardio = model('Cardio', cardioSchema);

module.exports = Cardio;