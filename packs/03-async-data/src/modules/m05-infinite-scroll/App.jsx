import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Albums from "./pages/Albums.jsx";
import "./styles.css";

export default function App() {
  return (
    <div className="pw-app" data-testid="photowall-app">
      <Navbar />
      <main className="pw-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="albums" element={<Albums />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
