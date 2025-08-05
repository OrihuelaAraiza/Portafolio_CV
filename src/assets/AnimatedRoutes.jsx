// src/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import GameProjects from "./pages/GameProjects";
import MobileApps from "./pages/MobileApps";
import WebProjects from "./pages/WebProjects";
import About from "./pages/About";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameProjects />} />
        <Route path="/mobile" element={<MobileApps />} />
        <Route path="/web" element={<WebProjects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}