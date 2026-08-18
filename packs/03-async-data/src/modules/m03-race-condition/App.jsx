import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./styles.css";

export default function App() {
  return (
    <div className="ce-app" data-testid="cityexplorer-app">
      <Navbar />
      <main className="ce-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
