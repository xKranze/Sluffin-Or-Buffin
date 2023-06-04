import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleWorkout = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { workoutId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { workoutId: workoutId },
  });

  const workout = data?.workout || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {workout.workoutAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this workout on {workout.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {workout.workoutText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={workout.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm workoutId={workout._id} />
      </div>
    </div>
  );
};

export default SingleWorkout;
