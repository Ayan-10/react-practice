import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import "./styles.css";

export default function App() {
  return (
    <div className="gs-app" data-testid="gifsearch-app">
      <Navbar />
      <main className="gs-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="trending" element={<Trending />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
