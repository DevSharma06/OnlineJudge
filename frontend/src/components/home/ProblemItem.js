import { Link, useNavigate } from "react-router-dom";

const ProblemItem = (props) => {
  const problem = props.problem;
  const navigate = useNavigate();

  const handleSolveClick = () => {
    navigate(`/problem/${problem._id}`);
  };

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
          <label className="language" key={l}>
            {l}
          </label>
        ))}
      </p>
      <div className="button">
        <button onClick={handleSolveClick}>Solve Now</button>
      </div>
    </div>
  );
};

export default ProblemItem;
