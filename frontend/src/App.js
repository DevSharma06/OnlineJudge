import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problem from "./pages/Problem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem/:value" element={<Problem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
