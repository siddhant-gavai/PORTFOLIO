import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' }, // here we can add the projects 
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-accent tracking-tighter">
                            SG<span className="text-gray-900 dark:text-white">.dev</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative group px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute left-0 bottom-0 block w-full h-0.5 bg-accent"
                                        />
                                    )}
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-600" />}
                        </button>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            <FaLinkedin size={20} />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-accent focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'text-accent bg-accent/10' : 'text-gray-700 dark:text-gray-300 hover:text-accent'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex justify-center space-x-6 pt-4 pb-2">
                                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-slate-800">
                                    {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-600" />}
                                </button>
                                <a href="https://github.com/siddhant-gavai" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300">
                                    <FaGithub size={24} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
