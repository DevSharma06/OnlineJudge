import { useState } from "react";
import ProblemSubmission from "./ProblemSubmission";

const ProblemDescription = (props) => {
  const problem = props.problem;
  const [isSubmitClicked, setSubmitClicked] = useState(false);

  const submitClickHandler = (e) => {
    e.preventDefault();

    setSubmitClicked(!isSubmitClicked);
    console.log(isSubmitClicked);
  };

  return (
    <div>
      {isSubmitClicked && (
        <ProblemSubmission
          clickHandler={submitClickHandler}
          problem={problem}
        />
      )}
      {!isSubmitClicked && (
        <div className="problem-desc">
          <div>
            <h3>{problem.title}</h3>
            <div className="problem-desc_description">
              {problem.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="sample-input">Sample Input</p>
            <div className="input">
              {problem.test_cases.input.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <p className="sample-output">Sample Output</p>
            <div className="output">
              {problem.test_cases.output.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
          <div className="problem-desc_button-div">
            <button
              onClick={submitClickHandler}
              className="problem-desc_button"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
