import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <div
            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <img
                    src={project.imageUrl || 'https://via.placeholder.com/600x400'}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white rounded-full hover:bg-accent hover:text-slate-900 transition-colors"
                            title="View Code"
                        >
                            <FaGithub size={18} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white rounded-full hover:bg-accent hover:text-slate-900 transition-colors"
                            title="Live Demo"
                        >
                            <FaExternalLinkAlt size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 bg-accent/10 text-cyan-600 dark:text-cyan-400 rounded-full uppercase tracking-wide">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="text-[10px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
