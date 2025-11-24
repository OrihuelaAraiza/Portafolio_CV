import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaStar, FaArrowRight } from 'react-icons/fa';

const WebProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-darker to-dark rounded-2xl overflow-hidden border border-darker/50 hover:border-accent/30 transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className="bg-gradient-to-r from-accent to-orange text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaStar className="text-[10px]" />
            Featured
          </motion.div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-dark to-darker">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Overlay with Actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4 bg-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt />
            Ver Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-darker hover:bg-darker/80 text-light px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border border-light/20 hover:border-light/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            Código
          </motion.a>
        </motion.div>

        {/* Year Badge */}
        <div className="absolute bottom-4 left-4 bg-dark/90 backdrop-blur-sm text-light px-3 py-1 rounded-lg text-xs font-semibold">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-light group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-light/50 uppercase tracking-wider font-semibold px-2 py-1 bg-darker rounded">
            {project.category}
          </span>
        </div>
        
        <p className="text-light/70 mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <motion.span
              key={tech}
              className="bg-accent/10 text-accent px-3 py-1.5 rounded-lg text-xs font-medium border border-accent/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="bg-darker text-light/60 px-3 py-1.5 rounded-lg text-xs font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <motion.button
          onClick={() => onOpenModal(project)}
          className="w-full bg-gradient-to-r from-accent/10 to-orange/10 hover:from-accent/20 hover:to-orange/20 text-accent font-semibold py-3 rounded-xl flex items-center justify-center gap-2 border border-accent/20 hover:border-accent/40 transition-all duration-300 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver Detalles
          <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default WebProjectCard;
