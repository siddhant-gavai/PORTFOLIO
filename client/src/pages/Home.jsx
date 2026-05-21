import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/projects';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState(mockProjects.slice(0, 3));

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
                if (res.data.length > 0) {
                    setFeaturedProjects(res.data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] opacity-50 dark:opacity-20 animate-pulse pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] opacity-50 dark:opacity-20 animate-pulse pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-accent font-semibold tracking-wide uppercase mb-4">
                            Full Stack Developer
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                            Building <span className="text-gradient">Intelligent</span> Web Solutions
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                            I specialize in building scalable, high-performance web applications using the MERN stack. Let's turn your ideas into reality.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="px-8 py-4 bg-accent text-slate-900 font-bold rounded-full hover:shadow-lg hover:shadow-accent/30 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                            >
                                View Work <FaArrowRight />
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-full hover:border-accent hover:text-accent transition-all bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                            >
                                Contact Me
                            </Link>
                        </div>

                        <div className="mt-12 flex gap-6">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Visual (Code/Abstract) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block relative"
                    >
                        <div className="relative z-10 bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700 p-6 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <pre className="text-sm md:text-base text-slate-800 dark:text-slate-300 font-mono overflow-x-auto">
                                <code>
                                    {`const developer = {
  name: 'Siddhant Gavai',
  role: 'MERN Stack Developer',
  skills: [
    'React', 'Node.js', 
    'MongoDB', 'Tailwind'
  ],
  passion: 'Building scalable apps'
};

// Ready to collaborate?
developer.contact();`}
                                </code>
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                                A selection of my recent work. Check out the projects page for more.
                            </p>
                        </div>
                        <Link
                            to="/projects"
                            className="hidden md:flex items-center gap-2 text-accent font-bold hover:underline"
                        >
                            View All <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={project._id || index} project={project} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
                        >
                            View All Projects <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
