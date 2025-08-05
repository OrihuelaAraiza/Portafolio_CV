import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import GameProjects from "./pages/GameProjects";
import Apps from "./pages/Apps"; // <--- NUEVA RUTA
import About from "./pages/About";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameProjects />} />
        <Route path="/apps" element={<Apps />} />   {/* <--- Solo Apps */}
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-light font-display">
      <BrowserRouter>
        <Navbar />
        <div className="pt-20 max-w-6xl mx-auto px-4 flex-1 flex flex-col w-full">
          <AnimatedRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}