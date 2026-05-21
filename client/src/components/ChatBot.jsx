import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaPaperPlane, FaTimes, FaRobot, FaUser, FaBolt } from 'react-icons/fa';
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: "Hi! I am Siddhant's AI assistant. Ask me anything about his skills, projects, or experience." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const suggestions = [
        { label: '🚀 Top Skills', text: 'What are your top technical skills?' },
        { label: '💼 Recent Projects', text: 'Tell me about your featured projects.' },
        { label: '✉️ Get in Touch', text: 'How can I contact you?' },
        { label: '⚡ Availability', text: 'Are you currently available for hire?' }
    ];

    const localKnowledgeBase = {
        skills: "Siddhant is highly proficient in full-stack engineering, specializing in the MERN stack:\n\n• **Frontend**: React, Next.js, Redux, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3\n• **Backend**: Node.js, Express, RESTful APIs, JWT Auth\n• **Database**: MongoDB, Mongoose\n• **Tools & Systems**: Git/GitHub, Docker, Vercel, Heroku\n\nHe is passionate about pixel-perfect responsive designs and building highly scalable, optimized web applications.",
        projects: "Siddhant has worked on several high-quality full-stack applications:\n\n1. **Dynamic Portfolio & Admin Dashboard**: A comprehensive site with real-time portfolio management and secure JWT authentication.\n2. **MediConnect**: A robust doctor-patient appointment booking and scheduling system (PERN stack).\n3. **AI-Powered Intelligent Chatbot**: A contextual portfolio chatbot built with Node.js and GPT models.\n\nYou can explore these in detail on the **Projects** section!",
        contact: "You can reach out to Siddhant in several ways:\n\n• ✉️ **Email**: [siddhant.gavai@gmail.com](mailto:siddhant.gavai@gmail.com)\n• 💼 **LinkedIn**: [linkedin.com](https://linkedin.com)\n• 🐙 **GitHub**: [github.com](https://github.com)\n\nAlternatively, you can fill out the interactive form on the **Contact** page of this website!",
        availability: "Yes! Siddhant is currently **actively looking for opportunities**:\n\n• Full-time Software Engineering roles\n• Remote or hybrid positions\n• Freelance and contract collaborations\n\nFeel free to drop an email or reach out on LinkedIn to start a conversation!",
        default: "I'd be glad to help! I can provide info on:\n• Siddhant's technical skills (MERN stack)\n• Featured software engineering projects\n• Contact details & social profiles\n• Current work availability\n\nFeel free to ask a question or use one of the quick suggestion buttons!"
    };

    const getLocalFallbackResponse = (message) => {
        const query = message.toLowerCase();
        if (query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('stack') || query.includes('expert')) {
            return localKnowledgeBase.skills;
        } else if (query.includes('project') || query.includes('portfolio') || query.includes('work') || query.includes('build') || query.includes('app')) {
            return localKnowledgeBase.projects;
        } else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('social') || query.includes('linkedin') || query.includes('github') || query.includes('phone')) {
            return localKnowledgeBase.contact;
        } else if (query.includes('avail') || query.includes('hire') || query.includes('job') || query.includes('work') || query.includes('opportunity') || query.includes('role') || query.includes('freelance')) {
            return localKnowledgeBase.availability;
        }
        return localKnowledgeBase.default;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (textToSend) => {
        if (!textToSend.trim()) return;

        const userMessage = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${apiURL}/api/ai/chat`, { message: textToSend });
            setMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
        } catch (error) {
            console.error('Chat API Error, activating local fallback:', error);
            // Simulate a slight typing delay for realistic feedback
            setTimeout(() => {
                const fallbackReply = getLocalFallbackResponse(textToSend);
                setMessages(prev => [
                    ...prev, 
                    { 
                        role: 'ai', 
                        content: `🤖 [Local Assistant Mode]\n\n${fallbackReply}` 
                    }
                ]);
                setLoading(false);
            }, 600);
            return;
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = input;
        setInput('');
        handleSendMessage(text);
    };

    const handleSuggestionClick = (suggestionText) => {
        handleSendMessage(suggestionText);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[550px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 z-50 flex flex-col overflow-hidden transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 px-6 py-4 flex justify-between items-center text-white border-b border-slate-200/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-accent/10 text-accent p-2.5 rounded-xl border border-accent/20">
                                    <FaRobot size={20} className="animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base tracking-tight">Siddhant's Copilot</h3>
                                    <span className="text-[10px] font-semibold tracking-wider text-accent uppercase flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span> Live Assistant
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all duration-200"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-800 dark:bg-slate-700 text-accent border border-slate-700 dark:border-slate-600'}`}>
                                        {msg.role === 'user' ? <FaUser size={12} /> : <FaRobot size={14} />}
                                    </div>
                                    <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none font-medium'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 rounded-bl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 text-accent flex items-center justify-center">
                                        <FaRobot size={14} />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-200/60 dark:border-slate-700/60 flex gap-1.5 items-center shadow-sm">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestion Chips */}
                        <div className="px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border-t border-slate-200/40 dark:border-slate-700/40 flex flex-wrap gap-2">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(suggestion.text)}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent hover:shadow-sm cursor-pointer transition-all duration-200 flex items-center gap-1 active:scale-95"
                                >
                                    {suggestion.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200/65 dark:border-slate-700/65 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about skills, work or contact..."
                                className="flex-1 bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-white px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-accent border border-transparent transition-all duration-300 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="p-3 bg-accent text-slate-900 rounded-full hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-6 right-4 md:right-8 px-5 py-4 bg-slate-900 dark:bg-slate-800 border border-slate-700/40 text-white hover:text-accent rounded-full shadow-[0_0_20px_rgba(0,247,255,0.15)] hover:shadow-[0_0_25px_rgba(0,247,255,0.35)] z-40 flex items-center gap-2.5 font-bold group cursor-pointer transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-accent opacity-75 animate-ping -top-1.5 -right-1.5"></span>
                    <FaCommentDots size={22} className="text-accent group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-sm font-semibold tracking-wide flex items-center gap-1">
                    Ask AI Assistant <FaBolt size={10} className="text-accent animate-pulse" />
                </span>
            </motion.button>
        </>
    );
};

export default ChatBot;
