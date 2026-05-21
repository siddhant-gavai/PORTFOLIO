import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 pt-16 pb-8 transition-colors duration-300 overflow-hidden">
            {/* Top Border Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-blue-600" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Info & Socials */}
                    <div className="space-y-4">
                        <Link to="/" className="text-xl font-bold text-accent tracking-tighter">
                            SG<span className="text-slate-900 dark:text-white">.dev</span>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                            Crafting scale-optimized MERN stack applications and intelligent solutions. Let's collaborate to build something exceptional.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <motion.a 
                                whileHover={{ y: -3, scale: 1.1 }}
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <FaGithub size={16} />
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -3, scale: 1.1 }}
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <FaLinkedin size={16} />
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -3, scale: 1.1 }}
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <FaTwitter size={16} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">About Me</Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">My Projects</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Get in Touch</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Contacts */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Direct Contacts
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-accent" />
                                <a href="mailto:siddhant.gavai@gmail.com" className="hover:text-accent transition-colors">siddhant.gavai@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-accent" />
                                <span>Mumbai, Maharashtra, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-[1px] bg-slate-200 dark:bg-slate-800 w-full mb-8" />

                {/* Bottom Footer Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            &copy; {new Date().getFullYear()} Siddhant Gavai. All rights reserved. Crafted with React & Tailwind CSS.
                        </p>
                    </div>

                    {/* Back to Top Arrow */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-850 hover:bg-accent dark:hover:bg-accent hover:text-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-200 flex items-center gap-2 text-xs font-bold border border-slate-250 dark:border-slate-750 cursor-pointer shadow-sm"
                        title="Back to Top"
                    >
                        Back to Top <FaArrowUp size={10} className="animate-bounce" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
