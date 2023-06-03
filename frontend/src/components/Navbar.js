import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Online Judge</h2>
        </Link>
        <ul>
          <li>
            <Link to="/addProblem">Add Problem</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
