import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { QUERY_SINGLE_WORKOUT } from '../utils/queries';
import ExerciseList from '../components/ExerciseList';

const SingleWorkout = () => {
  const { workoutId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_WORKOUT, {
    variables: { workoutId: workoutId },
  });

  const workout = data?.workout || {};

  const [timerDuration, setTimerDuration] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [stopClicked, setStopClicked] = useState(false);
  const [prevTimerDuration, setPrevTimerDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isTimerRunning && !isTimerPaused) {
      interval = setInterval(() => {
        setTimerDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, isTimerPaused]);

  const startTimer = () => {
    if (isTimerRunning || stopClicked) {
      setTimerDuration(0);
      setPrevTimerDuration(0);
      setStopClicked(false);
    }
    setIsTimerRunning(true);
    setIsTimerPaused(false);
  };

  const stopTimer = () => {
    if (stopClicked) {
      setIsTimerRunning(false);
      setTimerDuration(0);
      setPrevTimerDuration(0);
      setStopClicked(false);
      setIsTimerPaused(false);
    } else {
      setIsTimerRunning(false);
      setPrevTimerDuration(timerDuration);
      setStopClicked(true);
      setIsTimerPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsTimerPaused(!isTimerPaused);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const onExerciseEdit = (exerciseId) => {
    // Logic for editing the exercise
    console.log('Edit exercise with ID:', exerciseId);
  };

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {workout.workoutTitle} <br />
        <span style={{ fontSize: '1rem' }}>
          by {workout.workoutAuthor} on {workout.createdAt}
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
        <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
          Status:  {formatTime(stopClicked ? prevTimerDuration : timerDuration)}  <p> </p>
          <button onClick={startTimer}> Start </button> 
          <button onClick={stopTimer}> Stop </button> 
          <button onClick={pauseTimer}> {isTimerPaused ? 'Resume' : 'Pause'} </button>
        </h3>
        <div className="my-5">
          <ExerciseList exercises={workout.exercises} onExerciseEdit={onExerciseEdit} />
          
        </div>
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
