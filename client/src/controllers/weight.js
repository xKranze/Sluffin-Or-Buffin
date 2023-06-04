const { Schema, model } = require('mongoose');

const weightSchema = new Schema({
  exercise: {
    type: String,
    required: 'Please enter an exercise!',
  },
  pounds: {
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

const Weight = model('Weight', weightSchema);

module.exports = Weight;