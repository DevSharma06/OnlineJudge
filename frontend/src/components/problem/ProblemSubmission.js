import { FaBackspace, FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import CircularProgress from "@mui/joy/CircularProgress";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length >= 10;

const sampleJavaCode = `import java.util.Scanner;

// Please make sure the class name is Main

public class Main {
    public static void main(String[] args) {
        // Write your code here

    }
}`;

const textStyle = {
  margin: "0px",
  padding: "0px",
  color: "white",
  textAlign: "center",
};

let successContainerStyle = {
  background: "#1aac83",
  borderRadius: "5px",
  margin: "auto",
  padding: "10px",
  position: "relative",
  width: "50%",
  textAlign: "center",
  color: "white",
};

const ProblemSubmission = (props) => {
  const { user } = useAuthContext();
  const problem = props.problem;

  const languageRef = useRef();
  const codeRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [sampleCode, setSampleCode] = useState("");

  let background = "#1aac83";
  if (isLoading) {
    background = "#e8ae20";
  } else if (responseStatus !== "200") {
    background = "#e7195a";
  }

  successContainerStyle = {
    background: background,
    borderRadius: "5px",
    margin: "auto",
    padding: "10px",
    position: "relative",
    width: "50%",
    textAlign: "center",
    color: "white",
  };

  const [formValid, setFormValid] = useState({
    code: true,
  });

  const onLanguageChange = () => {
    if(languageRef.current.value == "Java") {
      setSampleCode(sampleJavaCode)
    } else {
      setSampleCode("")
    }
  }

  const submitProblem = async (solution) => {
    setIsLoading(true);
    const response = await fetch("http://localhost:4000/api/problems/submitProblem", {
      method: "POST",
      body: JSON.stringify(solution),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    console.log(data);

    setResponseStatus(data.status);
    setResponseMessage(data.message);

    setIsLoading(false);
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();

    props.clickHandler(e);
  };

  const submitClickHandler = (e) => {
    e.preventDefault();

    const selectedLanguage = languageRef.current.value;
    const enteredCode = codeRef.current.value;

    const enteredCodeIsValid = !isEmpty(enteredCode) && isTenChars(enteredCode);

    setFormValid({
      code: enteredCodeIsValid,
    });

    const IsFormValid = enteredCodeIsValid;

    if (!IsFormValid) {
      return;
    }
    if (!user) {
      return;
    }

    const solution = {
      problemId: problem._id,
      language: selectedLanguage,
      code: enteredCode,
    };

    submitProblem(solution);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>{problem.title}</h3>
      {responseMessage && (
        <div className="submit-result-container">
          <div style={successContainerStyle}>
            {responseStatus === "200" && (
              <FaCheckCircle style={{ fontSize: "45px" }} />
            )}
            {responseStatus !== "200" && (
              <AiFillCloseCircle style={{ fontSize: "45px" }} />
            )}
            <p>{responseMessage}</p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="submit-result-container">
          <div style={successContainerStyle}>
            <CircularProgress color="primary" variant="plain" />
            <p>Submitting code, please wait.</p>
          </div>
        </div>
      )}

      {!responseMessage && !isLoading && (
        <div className="submit-container">
          <form>
            <div>
              <label htmlFor="languages">Language</label>
              <select name="languages" id="languages" ref={languageRef} onChange={onLanguageChange}>
                {problem.languages.map((l) => (
                  <option value={l} key={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="code-input"
              placeholder="Paste your code here..."
              ref={codeRef}
              defaultValue={sampleCode}
              spellCheck="false"
            ></textarea>
            {!formValid.code && (
              <div style={textStyle}>
                <p>Please enter valid code</p>
              </div>
            )}

            <div className="buttons">
              <button onClick={submitClickHandler}>Submit Solution</button>
              <button onClick={cancelClickHandler}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProblemSubmission;
