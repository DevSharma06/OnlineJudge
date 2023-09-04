import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdAccountCircle } from "react-icons/md";
import userLogo from "../assets/images/user.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    // Function to close the dropdown when a click occurs outside of it
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    }

    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showAddProblem = () => {
    if (user) {
      if (user.role === "Mod" || user.role === "Admin") {
        return (
          <li>
            <Link to="/addProblem">Add Problem</Link>
          </li>
        );
      }
    }
  };

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
          {showAddProblem()}
          {user && (
            <li className="dropdown" ref={dropdownRef}>
              <div className="account-icon">
                <MdAccountCircle
                  style={{ color: "#1aac83", fontSize: "70px" }}
                  onClick={toggleDropdown}
                />
              </div>
              {isDropdownVisible && (
                <ul
                  className={`dropdown-content ${
                    isDropdownVisible ? "active" : ""
                  }`}
                >
                  <li onClick={closeDropdown}>
                    <Link>{user.email}</Link>
                  </li>
                  <li onClick={closeDropdown}>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              )}
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
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
