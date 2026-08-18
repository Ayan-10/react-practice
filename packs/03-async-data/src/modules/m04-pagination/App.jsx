import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import "./styles.css";

// Root of the BlogList mini-app. Router is provided by the host (main entry
// or the test's MemoryRouter) so this component only declares routes.
export default function App() {
  return (
    <div className="bl-app" data-testid="bloglist-app">
      <Navbar />
      <main className="bl-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
