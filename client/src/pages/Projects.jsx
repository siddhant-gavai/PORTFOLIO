import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaInbox } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/projects';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
                if (res.data.length > 0) {
                    setProjects(res.data);
                    setFilteredProjects(res.data);
                } else {
                    // Fallback to mock data if no projects in DB
                    setProjects(mockProjects);
                    setFilteredProjects(mockProjects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects(mockProjects);
                setFilteredProjects(mockProjects);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchProjects();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Filter and Search logic combined
    useEffect(() => {
        let result = projects;
        if (filter !== 'All') {
            result = result.filter(project => project.category === filter);
        }
        if (searchTerm.trim() !== '') {
            const query = searchTerm.toLowerCase();
            result = result.filter(project => 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.techStack.some(tech => tech.toLowerCase().includes(query))
            );
        }
        setFilteredProjects(result);
    }, [filter, searchTerm, projects]);

    const categories = ['All', 'WEB APP', 'Mobile App', 'Design', 'Other'];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        My Projects
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
                        Here is a showcase of my recent designs, prototypes, and fully deployed full-stack products.
                    </p>
                </div>

                {/* Search Bar & Filters Section */}
                <div className="max-w-xl mx-auto mb-10 space-y-5">
                    {/* Glassmorphic Search Bar */}
                    <div className="relative flex items-center bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm border border-slate-200 dark:border-slate-700 px-4 py-1.5 focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent transition-all">
                        <FaSearch className="text-slate-400 ml-2" size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by project name or technology (e.g. React)..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white px-3 py-2 text-sm placeholder-slate-400 dark:placeholder-slate-500"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                <FaTimes size={12} />
                            </button>
                        )}
                    </div>

                    {/* Premium Glassmorphic Filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer active:scale-95 border ${filter === cat
                                    ? 'bg-accent border-accent text-slate-900 shadow-md shadow-accent/15'
                                    : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300 hover:border-accent hover:text-accent'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <div className="relative">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-750 text-slate-400">
                                        <FaInbox size={40} className="animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">No Projects Found</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm">
                                            No matches found for "{searchTerm}" in category "{filter}". Try adjusting your query or category.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            layout
                                            custom={index}
                                            variants={cardVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.02 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            key={project._id}
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
