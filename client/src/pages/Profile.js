import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client'
import { EDIT_USER } from '../utils/mutations';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [goals, setGoals] = useState(user.goals);

  const [editUser] = useMutation(EDIT_USER);

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleUpdate = async () => {
    try {
      await editUser({
        variables: {
          userid: user._id,
          height: height,
          weight: weight,
          goals: goals
        },
      });
      alert("Update successful!");
    } catch (error) {
      console.error('Error editing workout:', error);
      
    }
  };

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Username: {user.username}<br /><br />
          Email: {user.email}<br /><br />
          Height: <textarea value={height} onChange={(e) => setHeight(e.target.value)} /><br /><br />
          Weight: <textarea value={weight} onChange={(e) => setWeight(e.target.value)} /><br /><br />
          Goals: <textarea value={goals} onChange={(e) => setGoals(e.target.value)} /><br /><br />
          <button onClick={handleUpdate}>Update</button>
        </h2>
      </div>
    </div>
  );
};

export default Profile;
