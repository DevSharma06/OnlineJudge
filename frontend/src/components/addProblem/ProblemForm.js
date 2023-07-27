import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length >= 10;
const isLangSelected = (arr) => arr.length === 0;

const ProblemForm = () => {
  const navigate = useNavigate();

  const languages = ["C", "C++", "Java", "Python"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const [langInfo, setLangInfo] = useState([]);

  const [formInputValidity, setFormInputValidity] = useState({
    title: true,
    desc: true,
    lang: true,
    input: true,
    output: true,
  });

  const titleInputRef = useRef();
  const descInputRef = useRef();
  const diffInputRef = useRef();
  const inputInputRef = useRef();
  const outputInputRef = useRef();

  const addProblemHandler = async (e) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredDiff = diffInputRef.current.value;
    const enteredInput = inputInputRef.current.value;
    const enteredOutput = outputInputRef.current.value;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredDescIsValid = isTenChars(enteredDesc);
    const enteredLangIsValid = !isLangSelected(langInfo);
    const enteredInputIsValid = !isEmpty(enteredInput);
    const enteredOutputIsValid = !isEmpty(enteredOutput);

    setFormInputValidity({
      title: enteredTitleIsValid,
      desc: enteredDescIsValid,
      lang: enteredLangIsValid,
      input: enteredInputIsValid,
      output: enteredOutputIsValid,
    });

    const formIsValid =
      enteredTitleIsValid &&
      enteredDescIsValid &&
      enteredLangIsValid &&
      enteredInputIsValid &&
      enteredOutputIsValid;

    const descArr = enteredDesc.split("\n").filter((e) => e);
    const inputArr = enteredInput.split("\n").filter((e) => e);
    const outputArr = enteredOutput.split("\n").filter((e) => e);

    // console.log(descArr);

    if (!formIsValid) {
      return;
    }

    const testCases = {
      input: [...inputArr],
      output: [...outputArr],
    };

    const enteredProblem = {
      title: enteredTitle,
      description: descArr,
      languages: langInfo,
      difficulty: enteredDiff,
      test_cases: testCases,
    };

    const response = await fetch("/api/problems/addProblem", {
      method: "POST",
      body: JSON.stringify(enteredProblem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      alert(json.message);
    } else {
      // alert(json);
      navigate("/");
    }
  };

  const checkboxChangeHandler = (e) => {
    // console.log(e.target.value);
    if (e.target.checked) {
      setLangInfo([...langInfo, e.target.value]);
    } else {
      setLangInfo(langInfo.filter((l) => l !== e.target.value));
    }
    // console.log(langInfo);
  };

  return (
    <div className="problem-container">
      <h2>Problem Details</h2>
      <div className="problem-form">
        <form>
          <div className="row">
            <div className="col-1">
              <label htmlFor="title">Problem title</label>
            </div>
            <div className="col-2">
              <input
                type="text"
                id="title"
                placeholder="Enter the title of the Problem"
                ref={titleInputRef}
              />
              {!formInputValidity.title && (
                <p>Please enter a valid Problem Title</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label htmlFor="desc">Problem description</label>
            </div>
            <div className="col-2">
              <textarea
                type="text"
                id="desc"
                placeholder="Enter the description of the Problem in separate lines"
                rows="5"
                ref={descInputRef}
              />
              {!formInputValidity.desc && (
                <p>Please enter a valid Problem Description</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label className="languages">Languages</label>
            </div>
            <div className="col-2">
              <ul className="checkbox-grid">
                {languages.map((l) => (
                  <li>
                    <label htmlFor={l}>
                      {l}
                      <input
                        type="checkbox"
                        id={l}
                        value={l}
                        onChange={checkboxChangeHandler}
                      />
                    </label>
                  </li>
                ))}
              </ul>
              {!formInputValidity.lang && <p>Please enter a valid language</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label htmlFor="diff">Difficulty</label>
            </div>
            <div className="col-2">
              <select type="dropdown" id="diff" ref={diffInputRef}>
                {difficulties.map((diff) => (
                  <option value={diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label htmlFor="input">Sample Input</label>
            </div>
            <div className="col-2">
              <textarea
                type="text"
                id="input"
                placeholder="Enter sample Input in separate lines"
                rows="3"
                ref={inputInputRef}
              />
              {!formInputValidity.input && (
                <p>Please enter a valid Sample input</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label htmlFor="output">Sample Output</label>
            </div>
            <div className="col-2">
              <textarea
                type="text"
                id="output"
                placeholder="Enter sample Output in separate lines"
                rows="3"
                ref={outputInputRef}
              />
              {!formInputValidity.output && (
                <p>Please enter a valid Sample output</p>
              )}
            </div>
          </div>

          <button onClick={addProblemHandler}>Add Problem</button>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
