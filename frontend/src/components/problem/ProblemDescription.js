const ProblemDescription = (props) => {
  const problem = props.problem;

  return (
    <div>
      <div className="problem-desc">
        <h3>
          {problem.serial_no}. {problem.title}
        </h3>
        <div className="problem-desc_description">
          {problem.description.map((line) => (
            <p>{line}</p>
          ))}
        </div>
        <p className="sample-input">Sample Input</p>
        <div className="input">
          {problem.test_cases.input.map((text) => (
            <p>{text}</p>
          ))}
        </div>
        <p className="sample-output">Sample Output</p>
        <div className="output">
          {problem.test_cases.output.map((text) => (
            <p>{text}</p>
          ))}
        </div>
      </div>
      <div className="problem-desc_button-div">
        <button className="problem-desc_button">Submit</button>
      </div>
    </div>
  );
};

export default ProblemDescription;
