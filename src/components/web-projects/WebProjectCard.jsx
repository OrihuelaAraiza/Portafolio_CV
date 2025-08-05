const WebProjectCard = ({ project }) => {
  return (
    <div className="bg-dark rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-darker">
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Ver Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-darker hover:bg-darker/80 text-light px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Código
            </a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-light">
          {project.title}
        </h3>
        <p className="text-light/70 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Category Badge */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-light/50 uppercase tracking-wide">
            {project.category}
          </span>
          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            >
              Demo →
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light/70 hover:text-light text-sm font-medium transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebProjectCard; 