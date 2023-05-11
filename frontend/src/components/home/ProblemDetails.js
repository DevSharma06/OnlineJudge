import { useEffect, useState } from "react";
import ProblemItem from "./ProblemItem";

const ProblemDetails = () => {
  const [problems, setProblems] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("/api/problems/getProblems");
      const json = await response.json();

      if (response.ok) {
        setProblems(json);
      } else {
        console.log(response);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="problem-details">
      {problems && problems.map((p) => <ProblemItem problem={p} key={p._id} />)}
    </div>
  );
};

export default ProblemDetails;
