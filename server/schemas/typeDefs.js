const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    height: String
    weight: String
    goals: String
    workouts: [Workout]!
  }

  type Workout {
    _id: ID,
    workoutTitle: String
    workoutText: String
    workoutAuthor: String
    createdAt: String
    exercises: [String!]!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    workouts(username: String): [Workout]
    workout(workoutId: ID!): Workout
    me: User
    my: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    editUser(userid: ID!, height: String, weight: String, goals: String): User
    addWorkout(workoutTitle: String!, workoutText: String!, exercises: [String!]!): Workout
    addComment(workoutId: ID!, commentText: String!): Workout
    editWorkout(workoutId: ID!, workoutTitle: String, workoutText: String, exercises: [String!]): Workout
    removeWorkout(workoutId: ID!): Workout
    removeComment(workoutId: ID!, commentId: ID!): Workout
  }
`;

module.exports = typeDefs;
