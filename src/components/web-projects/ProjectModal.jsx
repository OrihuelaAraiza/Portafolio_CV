import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaStar, FaCheck } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-dark/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-gradient-to-br from-darker to-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-accent/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-darker hover:bg-dark text-light p-3 rounded-full transition-all hover:scale-110"
              >
                <FaTimes />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-accent to-orange text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <FaStar />
                      Proyecto Destacado
                    </div>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-light/70 text-sm">{project.year}</span>
                    <span className="text-xs text-light/50 uppercase tracking-wider font-semibold px-3 py-1 bg-accent/20 text-accent rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-light mb-3">Descripción</h3>
                  <p className="text-light/80 leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-light mb-3">Características Destacadas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 bg-darker/50 p-3 rounded-lg border border-accent/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FaCheck className="text-accent mt-1 flex-shrink-0" />
                          <span className="text-light/80 text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-light mb-3">Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm font-medium border border-accent/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-darker">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-accent to-orange hover:from-accent/90 hover:to-orange/90 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt />
                    Ver Proyecto en Vivo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-darker hover:bg-dark text-light px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-light/20 hover:border-light/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub />
                    Ver Código en GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

