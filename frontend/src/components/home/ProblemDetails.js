import { useEffect, useState } from "react";
import ProblemItem from "./ProblemItem";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProblemDetails = () => {
  const [problems, setProblems] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("http://localhost:4000/api/problems/getProblems", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setProblems(json);
      } else {
        console.log(response);
      }
    };

    if (user) {
      fetchProblems();
    }
  }, [user]);

  return (
    <div className="problem-details">
      {problems && problems.map((p) => <ProblemItem problem={p} key={p._id} />)}
    </div>
  );
};

export default ProblemDetails;
