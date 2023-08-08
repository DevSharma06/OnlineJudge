import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

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
          {user && (
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/addProblem">Add Problem</Link>
            </li>
          )}

          {!user && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <Link>{user.email}</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
