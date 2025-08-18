import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkVeil from "./components/DarkVeil.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        {/* Background effect */}
        <DarkVeil/>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
