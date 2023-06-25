import TestCaseForm from "../components/addTestCase/TestCaseForm";
import { useLocation } from "react-router-dom";

const AddTestCase = () => {
  const { state } = useLocation();

  const problem = state;

  return (
    <div className="form-container">
      <TestCaseForm problem={problem} />
    </div>
  );
};

export default AddTestCase;
