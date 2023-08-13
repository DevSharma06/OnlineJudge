import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import AddProblem from "./pages/AddProblem";
import AddTestCase from "./pages/AddTestCase";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/problem/:value"
              element={user ? <Problem /> : <Navigate to="/login" />}
            />
            <Route
              path="/addProblem"
              element={user ? <AddProblem /> : <Navigate to="/login" />}
            />
            <Route
              path="/problem/addTestCase/:value"
              element={user ? <AddTestCase /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
