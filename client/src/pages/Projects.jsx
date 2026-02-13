import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('All');
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

        fetchProjects();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === filter));
        }
    }, [filter, projects]);

    const categories = ['All', 'Web App', 'Mobile App', 'Design', 'Other'];

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        My Projects
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on. Filter by category to see specific types of work.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                                ? 'bg-accent text-primary'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default Projects;
