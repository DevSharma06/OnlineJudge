import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Online Judge</h2>
        </Link>
        {/* <div className="logout-button">
          <button>Logout</button>
        </div> */}
        <ul>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
          <li>
            <Link to="/addProblem">Add Problem</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
