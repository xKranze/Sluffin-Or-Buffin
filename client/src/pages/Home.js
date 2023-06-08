import React from 'react';
import { useQuery } from '@apollo/client';

import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm';

import { QUERY_WORKOUTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const workouts = data?.workouts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkoutList
              workouts={workouts}
              title="Community Workout Feed"
            />
          )}
        </div>
      </div>
      <style>
        {`
          .btn.btn-danger {
            display: none;
          }
        `}
      </style>
    </main>
  );
};

export default Home;
