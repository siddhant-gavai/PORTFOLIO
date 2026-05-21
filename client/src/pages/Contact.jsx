import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPaperPlane, FaSpinner, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-5xl">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        Get In Touch
                    </h2>
                    <p className="text-slate-650 dark:text-slate-400 text-lg max-w-xl mx-auto">
                        Have an exciting project, a role opportunity, or just want to chat? I'd love to hear from you!
                    </p>
                </motion.div>

                {/* Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
                    
                    {/* Left Column: Direct Contacts */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-5 flex flex-col justify-between space-y-6"
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Contact Information</h3>
                            <p className="text-slate-600 dark:text-slate-450 text-sm leading-relaxed">
                                Feel free to reach out directly. I usually respond within 24 hours. Let's build something beautiful together!
                            </p>

                            <div className="space-y-4 pt-2">
                                {/* Email Card */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-lg">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Email</span>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                            <a href="mailto:siddhant.gavai@gmail.com" className="hover:text-accent transition-colors">siddhant.gavai@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-lg">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Location</span>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                            Mumbai, Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Panel */}
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider block mb-3">Connect on Socials</span>
                            <div className="flex gap-4">
                                <motion.a
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700/40 text-slate-600 dark:text-slate-350 hover:text-accent hover:border-accent font-semibold text-xs flex items-center gap-2 transition-all duration-200"
                                >
                                    <FaGithub size={14} /> GitHub
                                </motion.a>
                                <motion.a
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700/40 text-slate-650 dark:text-slate-355 hover:text-accent hover:border-accent font-semibold text-xs flex items-center gap-2 transition-all duration-200"
                                >
                                    <FaLinkedin size={14} /> LinkedIn
                                </motion.a>
                                <motion.a
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700/40 text-slate-650 dark:text-slate-355 hover:text-accent hover:border-accent font-semibold text-xs flex items-center gap-2 transition-all duration-200"
                                >
                                    <FaTwitter size={14} /> Twitter
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-7"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 h-full flex flex-col justify-between space-y-6"
                        >
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-800 dark:text-white text-sm"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-800 dark:text-white text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-800 dark:text-white text-sm resize-none"
                                        placeholder="Hello Siddhant! I'd like to talk about..."
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 bg-accent text-slate-900 font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane size={13} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
