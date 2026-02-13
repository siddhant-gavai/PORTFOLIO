import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
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
            <div className="w-full max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        Get In Touch
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Have a project in mind or just want to say hi? Fill out the form below.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
                >
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-slate-900 dark:text-white resize-none"
                            placeholder="Your message..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 bg-accent text-slate-900 font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:shadow-accent/20 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" /> Sending...
                            </>
                        ) : (
                            <>
                                <FaPaperPlane /> Send Message
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default Contact;
