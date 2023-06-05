const ExerciseList = ({ exercises = [] }) => {
  if (!exercises.length) {
    console.log(exercises);
    return <h3>No Exercises Yet</h3>;
  }

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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExerciseList;
