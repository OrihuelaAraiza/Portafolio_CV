import { useState } from 'react';
import WebProjectCard from '../components/web-projects/WebProjectCard';
import { AnimatePresence, motion } from "framer-motion";

const WebProjects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Plataforma completa de comercio electrónico con carrito de compras, sistema de pagos y panel de administración.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://via.placeholder.com/600x400/FF4747/FFFFFF?text=E-commerce+Platform",
      liveUrl: "#",
      githubUrl: "#",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Aplicación web para gestión de tareas con drag & drop, filtros y colaboración en tiempo real.",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      image: "https://via.placeholder.com/600x400/FF7F11/FFFFFF?text=Task+Manager",
      liveUrl: "#",
      githubUrl: "#",
      category: "frontend"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Dashboard meteorológico con mapas interactivos y pronósticos detallados para múltiples ciudades.",
      technologies: ["Vue.js", "OpenWeather API", "Chart.js"],
      image: "https://via.placeholder.com/600x400/232323/FFFFFF?text=Weather+Dashboard",
      liveUrl: "#",
      githubUrl: "#",
      category: "frontend"
    },
    {
      id: 4,
      title: "Social Media API",
      description: "API RESTful para red social con autenticación JWT, subida de archivos y notificaciones en tiempo real.",
      technologies: ["Express.js", "PostgreSQL", "Socket.io", "AWS S3"],
      image: "https://via.placeholder.com/600x400/161616/FFFFFF?text=Social+API",
      liveUrl: "#",
      githubUrl: "#",
      category: "backend"
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Proyectos <span className="text-accent">Web</span>
          </h1>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Desarrollo aplicaciones web modernas y responsivas utilizando las últimas tecnologías
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-accent text-white'
                  : 'bg-darker text-light hover:bg-accent/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <AnimatePresence>
    {filteredProjects.map((project) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ duration: 0.32 }}
      >
        <WebProjectCard project={project} />
      </motion.div>
    ))}
  </AnimatePresence>
</div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light/70 text-lg">
              No hay proyectos en esta categoría por el momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebProjects; 