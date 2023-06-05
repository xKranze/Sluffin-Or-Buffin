import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = ({
  workouts,
  title,
  showTitle = true
}) => {
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
            </h4>
            <div className="card-body bg-light p-2">
              <p>{workout.workoutText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;
