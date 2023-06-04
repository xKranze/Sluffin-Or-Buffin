import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addWorkout($workoutText: String!) {
    addWorkout(workoutText: $workoutText) {
      _id
      workoutText
      workoutAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($workoutId: ID!, $commentText: String!) {
    addComment(workoutId: $workoutId, commentText: $commentText) {
      _id
      workoutText
      workoutAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
