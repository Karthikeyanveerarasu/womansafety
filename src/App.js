import Mobile from "./Mobile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import Woman from "./Woman";
import Emergency from "./Emergency";
import Profile from "./user/Profile";
import About from "./user/About";
import Contactus from "./user/Contactus";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Contact />} />
          <Route exact path="/reg" element={<Mobile />} />
          <Route exact path="/d1a2t3a4" element={<Woman />} />
          <Route exact path="/home" element={<Emergency />} />
          <Route exact path="/contactus" element={<Contactus />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
