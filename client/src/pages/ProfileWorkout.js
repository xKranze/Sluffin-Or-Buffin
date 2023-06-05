import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';

import { QUERY_USER, QUERY_MY } from '../utils/queries';

import Auth from '../utils/auth';

const ProfileWorkout = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_MY, {
    variables: { username: userParam },
  });

  const user = data?.my || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/my" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
console.log(user);
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <WorkoutForm />
          </div>
        <div className="col-12 col-md-10 mb-5">
          <WorkoutList
            workouts={user.workouts}
            title={`${user.username}'s workouts...`}
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileWorkout;
