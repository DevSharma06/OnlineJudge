import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import AddProblem from "./pages/AddProblem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem/:value" element={<Problem />} />
            <Route path="/addProblem" element={<AddProblem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
