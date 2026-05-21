import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaInbox } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for development if API is empty/down
        const mockProjects = [
            {
                _id: '1',
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
                techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                category: 'Web App',
                imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                _id: '2',
                title: 'Task Management App',
                description: 'Productivity tool for teams to manage tasks, collaborate in real-time, and track progress.',
                techStack: ['React', 'Firebase', 'Tailwind'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                category: 'Web App',
                imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                _id: '3',
                title: 'Portfolio Website',
                description: 'Personal portfolio website showing skills, projects and contact info.',
                techStack: ['React', 'Tailwind', 'Framer Motion'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                category: 'Design',
                imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                _id: '4',
                title: 'SkillSwap',
                description: 'A peer-to-peer skill exchange platform where users trade skills instead of money. Features JWT auth, skill listings with categories, exchange requests, Google Meet & Calendar integration, a personal dashboard, and a user review system.',
                techStack: ['React (Vite)', 'Tailwind CSS', 'Lucide React', 'Axios', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT', 'BCrypt'],
                githubLink: 'https://github.com/siddhant-gavai/SkillSwap',
                liveLink: 'https://skill-swap-seven-tau.vercel.app',
                category: 'Full Stack / MERN',
                imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                _id: '5',
                title: 'ListNest',
                description: 'A full-stack property listing platform for exploring and booking unique accommodations worldwide. Features Passport.js auth, full CRUD for listings, smart search, category filters, Cloudinary image uploads, a review system, and tax toggle.',
                techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS', 'Passport.js', 'Tailwind CSS', 'Bootstrap 5', 'Multer', 'Cloudinary', 'Joi'],
                githubLink: 'https://github.com/siddhant-gavai/listnest',
                liveLink: '',
                category: 'Full Stack / MEN Stack',
                imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                _id: '6',
                title: 'My Portfolio (MERN + AI)',
                description: 'This portfolio website itself — a full-stack MERN app with an AI chatbot powered by OpenAI ("Ask Siddhant AI"), a secure Admin Dashboard to manage projects dynamically, dark/light mode, Framer Motion animations, and a contact form with email notifications via Nodemailer.',
                techStack: ['React.js (Vite)', 'Tailwind CSS', 'Framer Motion', 'React Icons', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'OpenAI API', 'JWT', 'Nodemailer'],
                githubLink: 'https://github.com/siddhant-gavai/PORTFOLIO',
                liveLink: '',
                category: 'Full Stack / MERN',
                imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
        ];

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

    const categories = ['All', 'Web App', 'Mobile App', 'Design', 'Full Stack / MERN', 'Full Stack / MEN Stack', 'Other'];

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
                                    {filteredProjects.map((project) => (
                                        <motion.div
                                            layout
                                            key={project._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
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
