import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_WORKOUT } from '../../utils/mutations'
import { QUERY_WORKOUTS } from '../../utils/queries';

const WorkoutList = ({
  workouts,
  title,
  showTitle = true
}) => {
  const [removeWorkout, { error }] = useMutation(REMOVE_WORKOUT, {
    refetchQueries: [{ query: QUERY_WORKOUTS }]
  });
  
  const handleWorkoutDelete = async (workoutId) => {
    try {
      await removeWorkout({
        variables: { workoutId }
      });
      window.location.assign('/');
      // window.location.assign('/my');
    } catch (err) {
      console.error('Failed to delete workout:', err);
    }
  };
  
  if (!workouts.length) {
    return <h3>No Workouts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {workouts &&
        workouts.map((workout) => (
          <div key={workout._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
                <Link
                  className="text-light"
                  to={`/workouts/${workout._id}`}
                >
                  {workout.workoutTitle} <br />
                  <span style={{ fontSize: '1rem' }}>
                    by {workout.workoutAuthor} on {workout.createdAt}
                  </span>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleWorkoutDelete(workout._id)}
                >
                  Delete
                </button>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{workout.workoutText}</p>
            </div>
          </div>
        ))}
      {error && <div>Deletion error: {error.message}</div>}
    </div>
  );
};

export default WorkoutList;



