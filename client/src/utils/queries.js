import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      workouts {
        _id
        workoutText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getWorkouts {
    workouts {
      _id
      workoutText
      workoutAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleWorkout($workoutId: ID!) {
    workout(workoutId: $workoutId) {
      _id
      workoutText
      workoutAuthor
      createdAt
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
        workoutText
        workoutAuthor
        createdAt
      }
    }
  }
`;
