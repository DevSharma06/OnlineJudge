import { useParams } from "react-router-dom";
import ProblemDescription from "../components/problem/ProblemDescription";
import { useEffect, useState } from "react";

const Problem = () => {
  const { value } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const getProblem = async () => {
      const response = await fetch(`/api/problems/getProblemByNo/${value}`);
      const json = await response.json();

      if (response.ok) {
        setProblem(json);
      } else {
        console.log(json);
      }
    };

    getProblem();
  }, []);
  return <div>{problem && <ProblemDescription problem={problem} />}</div>;
};

export default Problem;
