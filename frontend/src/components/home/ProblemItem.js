import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProblemItem = (props) => {
  const problem = props.problem;
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const showAddTestCase = () => {
    if (user.role === "Mod" || user.role === "Admin") {
      return (
        <button
          style={{ width: "150px", marginRight: "10px" }}
          onClick={handleTestCaseClick}
        >
          Add Test Cases
        </button>
      );
    }
  };

  const handleSolveClick = () => {
    navigate(`/problem/${problem._id}`);
  };

  const handleTestCaseClick = () => {
    navigate(`/problem/addTestCase/${problem._id}`, {
      replace: false,
      state: problem,
    });
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
        {showAddTestCase()}
        <button onClick={handleSolveClick}>Solve</button>
      </div>
    </div>
  );
};

export default ProblemItem;
