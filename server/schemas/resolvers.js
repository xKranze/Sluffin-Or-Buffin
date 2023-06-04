const { AuthenticationError } = require('apollo-server-express');
const { User, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('workouts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('workouts');
    },
    workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ createdAt: -1 });
    },
    workout: async (parent, { workoutId }) => {
      return Workout.findOne({ _id: workoutId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('workouts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addWorkout: async (parent, { workoutText }, context) => {
      if (context.user) {
        const workout = await Workout.create({
          workoutText,
          workoutAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workout._id } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { workoutId, commentText }, context) => {
      if (context.user) {
        return Workout.findOneAndUpdate(
          { _id: workoutId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeWorkout: async (parent, { workoutId }, context) => {
      if (context.user) {
        const workout = await Workout.findOneAndDelete({
          _id: workoutId,
          workoutAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { workoutId, commentId }, context) => {
      if (context.user) {
        return Workout.findOneAndUpdate(
          { _id: workoutId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
