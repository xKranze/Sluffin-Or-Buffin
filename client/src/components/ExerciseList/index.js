import React from 'react';

const ExerciseList = ({ exercises = [] }) => {
  // const [exerciseText, setExerciseText] = useState(exercises);

  // useEffect(() => {
  //   setExerciseText(exercises)
  // }, [exercises]);

  if (!exercises.length) {
    console.log(exercises);
    return <h3>No Exercises Yet</h3>;
  }
  // const onExerciseEdit = (index) => {
  //   const updatedText = prompt('Enter new exercise text:');
  //   if(updatedText !== null) {
  //     const updatedExercises = [...exercises];
  //     updatedExercises[index] = updatedText;
  //     // setExerciseText(updatedExercises);
  //     console.log(updatedExercises)
  //   }
  //   console.log('Edit exercise with ID:', index);
  // };
  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Exercises
      </h3>
      <div className="flex-row my-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <p className="card-body">{exercise}</p>
              {/* <button onClick={() => onExerciseEdit(index)}>Edit</button> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExerciseList;
