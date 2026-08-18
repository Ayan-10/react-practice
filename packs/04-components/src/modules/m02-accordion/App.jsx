import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import "./styles.css";

/**
 * FaqPage — a small but complete FAQ app (navbar + accordion + a second
 * route). The feature lives in components/Accordion.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) or nested under "/m02".
 */
export default function App() {
  return (
    <div className="fq-app" data-testid="faqpage-app">
      <Navbar />
      <main className="fq-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
