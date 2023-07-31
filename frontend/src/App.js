import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import AddProblem from "./pages/AddProblem";
import AddTestCase from "./pages/AddTestCase";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/problem/:value" element={<Problem />} />
            <Route path="/addProblem" element={<AddProblem />} />
            <Route
              path="/problem/addTestCase/:value"
              element={<AddTestCase />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
