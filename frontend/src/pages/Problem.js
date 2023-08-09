import { useParams } from "react-router-dom";
import ProblemDescription from "../components/problem/ProblemDescription";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Problem = () => {
  const { value } = useParams();
  const [problem, setProblem] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const getProblem = async () => {
      const response = await fetch(`/api/problems/getProblemById/${value}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setProblem(json);
      } else {
        console.log(json);
      }
    };

    getProblem();
  }, []);
  return (
    <div className="problem">
      {problem && <ProblemDescription problem={problem} />}
    </div>
  );
};

export default Problem;
