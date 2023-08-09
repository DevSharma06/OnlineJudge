import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const isEmpty = (value) => value.trim() === "";

const TestCaseForm = (props) => {
  const { user } = useAuthContext();
  const problem = props.problem;

  const inputRef = useRef();
  const outputRef = useRef();

  const [formValid, setFormValid] = useState({
    input: true,
    output: true,
  });

  const addInputOutputHandler = async (e) => {
    e.preventDefault();

    const enteredInput = inputRef.current.value;
    const enteredOutput = outputRef.current.value;

    const enteredInputIsValid = !isEmpty(enteredInput);
    const enteredOutputIsValid = !isEmpty(enteredOutput);

    setFormValid({
      input: enteredInputIsValid,
      output: enteredOutputIsValid,
    });

    const IsFormValid = enteredInputIsValid && enteredOutputIsValid;

    if (!IsFormValid) {
      return;
    }
    if (!user) {
      return;
    }

    const testCase = {
      problemId: problem._id,
      input: enteredInput,
      output: enteredOutput,
    };

    const response = await fetch("/api/problems/addTestCase", {
      method: "POST",
      body: JSON.stringify(testCase),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      alert(json.error);
    } else {
      // alert(json);
      inputRef.current.value = "";
      outputRef.current.value = "";
      alert(json.message);
    }
  };

  return (
    <div className="input-output-container">
      <h3>{problem.title}</h3>
      <div className="problem-form" style={{ margin: 0 }}>
        <div>
          <div className="problem-form_desc">
            {problem.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <h3>Test Cases</h3>
      <form className="problem-form">
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
              ref={inputRef}
            />
            {!formValid.input && <p>Please enter a valid Input</p>}
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
              ref={outputRef}
            />
            {!formValid.output && <p>Please enter a valid Output</p>}
          </div>
        </div>

        <button onClick={addInputOutputHandler}>Add Test case</button>
      </form>
    </div>
  );
};

export default TestCaseForm;
