import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WebProjectCard from '../components/web-projects/WebProjectCard';
import ProjectModal from '../components/web-projects/ProjectModal';
import { webProjects } from '../data/webProjects';
import { FaCode, FaPalette, FaServer, FaLayerGroup } from 'react-icons/fa';

const WebProjects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: <FaLayerGroup />, count: webProjects.length },
    { id: 'frontend', name: 'Frontend', icon: <FaPalette />, count: webProjects.filter(p => p.category === 'frontend').length },
    { id: 'backend', name: 'Backend', icon: <FaServer />, count: webProjects.filter(p => p.category === 'backend').length },
    { id: 'fullstack', name: 'Full Stack', icon: <FaCode />, count: webProjects.filter(p => p.category === 'fullstack').length }
  ];

  const filteredProjects = filter === 'all' 
    ? webProjects 
    : webProjects.filter(project => project.category === filter);

  const featuredProjects = webProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured || filter !== 'all');

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Proyectos <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange">Web</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-light/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Desarrollo aplicaciones web modernas con enfoque en{' '}
            <span className="text-accent font-semibold">UI/UX excepcional</span>,{' '}
            <span className="text-orange font-semibold">rendimiento optimizado</span> y{' '}
            <span className="text-accent font-semibold">experiencias interactivas</span>
          </motion.p>
          
          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{webProjects.length}</div>
              <div className="text-sm text-light/60 uppercase tracking-wide">Proyectos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange">{featuredProjects.length}</div>
              <div className="text-sm text-light/60 uppercase tracking-wide">Destacados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {new Set(webProjects.flatMap(p => p.technologies)).size}
              </div>
              <div className="text-sm text-light/60 uppercase tracking-wide">Tecnologías</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                filter === category.id
                  ? 'bg-gradient-to-r from-accent to-orange text-white shadow-lg shadow-accent/30'
                  : 'bg-darker text-light hover:bg-darker/80 border border-darker hover:border-accent/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{category.icon}</span>
              <span className="relative z-10">{category.name}</span>
              <span className={`relative z-10 px-2 py-0.5 rounded-full text-xs ${
                filter === category.id ? 'bg-white/20' : 'bg-accent/20 text-accent'
              }`}>
                {category.count}
              </span>
              {filter === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 to-orange/20"
                  layoutId="activeFilter"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects Section */}
        {filter === 'all' && featuredProjects.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-light mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-accent to-orange rounded-full"></span>
              Proyectos Destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <AnimatePresence>
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <WebProjectCard project={project} onOpenModal={handleOpenModal} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: filter === 'all' ? 0.8 : 0.6 }}
        >
          {filter !== 'all' && (
            <h2 className="text-3xl font-bold text-light mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-accent to-orange rounded-full"></span>
              {categories.find(c => c.id === filter)?.name} Projects
            </h2>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <WebProjectCard project={project} onOpenModal={handleOpenModal} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-light/70 text-xl mb-2">
              No hay proyectos en esta categoría por el momento.
            </p>
            <p className="text-light/50 text-sm">
              Próximamente agregaré más proyectos aquí.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-accent/10 to-orange/10 border border-accent/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-light mb-3">
              ¿Interesado en trabajar juntos?
            </h3>
            <p className="text-light/70 mb-6">
              Estoy siempre abierto a discutir nuevos proyectos, ideas creativas o oportunidades para ser parte de tus visiones.
            </p>
            <motion.a
              href="/about"
              className="inline-block bg-gradient-to-r from-accent to-orange hover:from-accent/90 hover:to-orange/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctame
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default WebProjects;
