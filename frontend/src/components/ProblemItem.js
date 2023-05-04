const ProblemItem = (props) => {
  const problem = props.problem;

  return (
    <div className="problem-item">
      <h4>{problem.title}</h4>
      <p>
        <strong>Difficulty: </strong>
        <label className="difficulty">{problem.difficulty}</label>
      </p>
      <p>
        <strong>Languages: </strong>
        {problem.languages.map((l) => (
          <label className="language" key={l}>{l}</label>
        ))}
      </p>
      <button>Solve</button>
    </div>
  );
};

export default ProblemItem;
