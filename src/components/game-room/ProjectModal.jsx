import { motion } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      className="fixed inset-0 bg-dark/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-darker p-6 rounded-2xl shadow-lg border-2 border-orange relative"
        initial={{ scale: 0.7, y: 32 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 32 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <img src={project.img} alt={project.title} className="rounded-xl w-40 h-40 object-cover mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-orange mb-2">{project.title}</h3>
        <p className="text-light/80 mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(t => (
            <span key={t} className="bg-orange/20 text-orange px-2 py-1 rounded text-xs font-semibold">{t}</span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 bg-accent hover:bg-orange text-dark px-4 py-2 rounded-lg font-bold shadow transition-all text-center"
          >
            Ver Proyecto
          </a>
        )}
        <button onClick={onClose} className="absolute top-2 right-4 text-light hover:text-orange text-xl font-bold">&times;</button>
      </motion.div>
    </motion.div>
  );
}