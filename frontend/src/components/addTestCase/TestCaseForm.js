const TestCaseForm = (props) => {
  const problemId = props.problemId;

  const addInputOutputHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="input-output-container">
      <h2>Test Cases</h2>
      <div className="problem-form">
        <div className="row">
          <div className="col-1">
            <label htmlFor="desc">Input</label>
          </div>
          <div className="col-2">
            <textarea
              type="text"
              id="desc"
              placeholder="Enter a valid input for the problem"
              rows="3"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <label htmlFor="desc">Output</label>
          </div>
          <div className="col-2">
            <textarea
              type="text"
              id="desc"
              placeholder="Enter a valid output for the problem"
              rows="3"
            />
          </div>
        </div>

        <button onClick={addInputOutputHandler}>Add Test case</button>
      </div>
    </div>
  );
};

export default TestCaseForm;
