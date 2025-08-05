// src/components/common/Navbar.jsx
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Videojuegos", path: "/games" },
  { name: "Apps", path: "/apps" },         // <- Cambiado, uno solo
  { name: "Sobre mí", path: "/about" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-darker shadow z-50 fixed top-0 left-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <span className="text-2xl font-extrabold text-accent tracking-wide select-none">JP Orihuela</span>
        {/* Links */}
        <div className="flex gap-10">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "relative font-semibold text-lg transition-colors duration-200 pb-1",
                  isActive
                    ? item.name === "Apps"
                      ? "text-orange underline underline-offset-4 decoration-orange"
                      : "text-light underline underline-offset-4 decoration-accent"
                    : "text-light/90 hover:text-accent/80"
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}