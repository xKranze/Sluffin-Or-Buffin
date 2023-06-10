import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WORKOUT } from '../../utils/mutations';
import { QUERY_WORKOUTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const WorkoutForm = () => {
  const [workoutText, setWorkoutText] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exercises, setExercises] = useState([]);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      try {
        const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });
        cache.writeQuery({
          query: QUERY_WORKOUTS,
          data: { workouts: [addWorkout, ...workouts] },
        });
      } catch (e) {
        console.error(e);
      }

      const queryResult = cache.readQuery({ query: QUERY_WORKOUTS });

      if (queryResult && queryResult.workouts) {
        const { workouts } = queryResult;

        cache.writeQuery({
          query: QUERY_WORKOUTS,
          data: { workouts: [addWorkout, ...workouts] },
        });


      }
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addWorkout({
        variables: {
          workoutTitle,
          workoutText,
          exercises,
        }
      });
      setWorkoutText('');
      setWorkoutTitle('');
      setExercises([]);
      window.location.assign('/');
      // window.location.assign('/my');
    } catch (err) {
      console.error(err);
    }
  };


  const handleExerciseChange = (index, event) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = event.target.value;
    setExercises(updatedExercises);
  };

  const handleAddExercise = () => {
    setExercises(prevExercises => [...prevExercises, '']);
  };


  const handleRemoveExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  return (
    <div className='bg-primary text-light p-2 m-0'>
      <h3 >Start a new workout routine!</h3>
      <br />

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="card-header bg-primary text-light p-2 m-0">
            <div className="flex-row justify-center">
            <div className="col-12 col-lg-3">
              <h5>Title:</h5>
              <br />
              <h5>Description:</h5>
            </div>

            <div className="col-12 col-lg-9">
              <input
                name="workoutTitle"
                type="text"
                placeholder="Name your workout routine, ex. Leg Day"
                value={workoutTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event) => setWorkoutTitle(event.target.value)}
              />

              <textarea
                name="workoutText"
                placeholder="Workout description"
                value={workoutText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event) => setWorkoutText(event.target.value)}
              ></textarea>
            </div>

            <br />
            <br />

            <div className="col-12 col-lg-12">
              <h3>Exercises:</h3>
              <button className="btn btn-primary btn-block py-3" type="button" onClick={handleAddExercise}>
                Add Exercise
              </button>
              <hr></hr>
              <div>
                {exercises.map((exercise, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="ex. Pushups, 5 sets of 15, take 1 minute break"
                      className="form-input w-80"
                      value={exercise}
                      onChange={(event) => handleExerciseChange(index, event)}
                    />

                    <button className="btn btn-primary btn-block py-3" type="button" onClick={() => handleRemoveExercise(index)} style={{ width: '20%' }}>
                      Remove
                    </button>
                  </div>
                ))}
                <br />
                <br />
              </div>
            </div>
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Workout
            </button>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
            </div>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your workouts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WorkoutForm;
