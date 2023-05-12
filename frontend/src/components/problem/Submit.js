const Submit = (props) => {
  const problem = props.problem;

  const cancelClickHandler = (e) => {
    e.preventDefault();

    props.clickHandler(e);
  };

  return (
    <div>
      <div className="submit-container">
        <form>
          <div>
            <label htmlFor="languages">Language</label>
            <select name="languages" id="languages">
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
          ></textarea>

          <div className="buttons">
            <button>Upload Solution</button>
            <button onClick={cancelClickHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Submit;
