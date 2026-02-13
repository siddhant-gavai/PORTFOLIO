import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaPaperPlane, FaTimes, FaRobot, FaUser } from 'react-icons/fa';
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Hi! I am Siddhant\'s AI assistant. Ask me anything about his skills, projects, or experience.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            console.log('Sending request to:', `${import.meta.env.VITE_API_URL}/api/ai/chat`);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/chat`, { message: userMessage.content });
            setMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Sorry, I am having trouble connecting right now. Please try again later.';
            setMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-accent px-6 py-4 flex justify-between items-center text-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <FaRobot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Ask Siddhant AI</h3>
                                    <span className="text-xs font-medium opacity-80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-accent text-slate-900'}`}>
                                        {msg.role === 'user' ? <FaUser size={12} /> : <FaRobot size={14} />}
                                    </div>
                                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent text-slate-900 flex items-center justify-center">
                                        <FaRobot size={14} />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-700 flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about my skills..."
                                className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-accent border border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="p-3 bg-accent text-slate-900 rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`fixed bottom-6 right-4 md:right-8 p-4 bg-accent text-slate-900 rounded-full shadow-lg z-40 flex items-center gap-2 font-bold group ${isOpen ? 'hidden' : 'flex'}`}
            >
                <FaCommentDots size={24} />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                    Ask About Me
                </span>
            </motion.button>
        </>
    );
};

export default ChatBot;
