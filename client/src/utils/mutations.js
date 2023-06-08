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

export const ADD_WORKOUT = gql`
  mutation Mutation($workoutTitle: String!, $workoutText: String!, $exercises: [String!]!) {
  addWorkout(workoutTitle: $workoutTitle, workoutText: $workoutText, exercises: $exercises) {
    _id
    workoutTitle
    workoutText
    workoutAuthor
    exercises
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

export const ADD_COMMENT = gql`
  mutation addComment($workoutId: ID!, $commentText: String!) {
    addComment(workoutId: $workoutId, commentText: $commentText) {
      _id
      workoutTitle
      workoutText
      workoutAuthor
      createdAt
      exercises
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
      _id
    }
  }
`;


export const EDIT_WORKOUT = gql`
mutation editWorkout($workoutId: ID!, $exercises: [String!], $workoutTitle: String!, $workoutText: String!) {
  editWorkout(workoutId: $workoutId, exercises: $exercises, workoutTitle: $workoutTitle, workoutText: $workoutText) {
    _id
    exercises
    workoutText
    workoutTitle
  }
}
`;