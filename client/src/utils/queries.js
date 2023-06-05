import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      workouts {
        _id
        workoutTitle
        workoutText
        createdAt
        exercises
      }
    }
  }
`;

export const QUERY_WORKOUTS = gql`
  query getWorkouts {
    workouts {
      _id
      workoutTitle
      workoutText
      workoutAuthor
      createdAt
      exercises
    }
  }
`;

export const QUERY_SINGLE_WORKOUT = gql`
  query getSingleWorkout($workoutId: ID!) {
    workout(workoutId: $workoutId) {
      _id
      workoutTitle
      workoutText
      workoutAuthor
      createdAt
      exercises
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workouts {
        _id
        workoutTitle
        workoutText
        workoutAuthor
        createdAt
        exercises
      }
    }
  }
`;

export const QUERY_MY = gql`
  query my {
    my {
      _id
      username
      email
      workouts {
        _id
        workoutTitle
        workoutText
        workoutAuthor
        createdAt
        exercises
      }
    }
  }
`;
