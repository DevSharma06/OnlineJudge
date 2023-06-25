import TestCaseForm from "../components/addTestCase/TestCaseForm";
import { useLocation } from "react-router-dom";

const AddTestCase = () => {
  const { state } = useLocation();

  const problemId = state;

  return (
    <div className="form-container">
      <TestCaseForm problemId={problemId} />
    </div>
  );
};

export default AddTestCase;
