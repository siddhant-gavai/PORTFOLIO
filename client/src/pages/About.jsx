import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaDownload, FaEye, FaReact, FaNodeJs, FaDatabase, FaCss3Alt, FaJsSquare, FaGitAlt, FaPython, FaServer } from 'react-icons/fa';

const About = () => {
    const skills = [
        { name: 'React.js', level: 'Advanced', icon: FaReact, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25' },
        { name: 'Node.js', level: 'Advanced', icon: FaNodeJs, color: 'text-green-500 bg-green-500/10 border-green-500/25' },
        { name: 'MongoDB', level: 'Intermediate', icon: FaDatabase, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25' },
        { name: 'Express.js', level: 'Intermediate', icon: FaServer, color: 'text-purple-400 bg-purple-400/10 border-purple-400/25' },
        { name: 'Tailwind CSS', level: 'Advanced', icon: FaCss3Alt, color: 'text-sky-400 bg-sky-400/10 border-sky-400/25' },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: FaJsSquare, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' },
        { name: 'Git & GitHub', level: 'Intermediate', icon: FaGitAlt, color: 'text-orange-500 bg-orange-500/10 border-orange-500/25' },
        { name: 'Python', level: 'Basic', icon: FaPython, color: 'text-blue-500 bg-blue-500/10 border-blue-500/25' },
    ];

    const experience = [
        {
            role: 'Full Stack Developer',
            company: 'Freelance',
            period: '2023 - Present',
            description: 'Building custom web applications for clients using MERN stack.'
        },
        {
            role: 'Frontend Intern',
            company: 'Tech Solutions Inc.',
            period: '2022 - 2023',
            description: 'Assisted in developing responsive UI components using React and Tailwind.'
        }
    ];

    const education = [
        {
            degree: 'B.Tech in Computer Science',
            institution: 'Example University',
            period: '2020 - 2024',
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        About Me
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                        I am a passionate Full Stack Developer with a strong foundation in the MERN stack.
                        I love building scalable, user-friendly applications and solving complex problems with code.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            aria-label="View Siddhant's Resume in a new tab"
                        >
                            <FaEye /> View Resume
                        </a>
                        <a
                            href="/resume.pdf"
                            download="Siddhant_Gavai_Resume.pdf"
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent text-slate-900 font-bold rounded-xl shadow-lg shadow-accent/15 hover:shadow-xl hover:shadow-accent/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            aria-label="Download Siddhant's Resume PDF directly"
                        >
                            <FaDownload /> Download Resume
                        </a>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
                        Skills & Technologies
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {skills.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col items-center gap-3 transition-shadow duration-200 hover:shadow-md hover:border-slate-350 dark:hover:border-slate-650`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border text-2xl ${skill.color}`}>
                                        <IconComponent />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{skill.name}</p>
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-0.5 block">{skill.level}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Experience & Education */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Experience */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                            <FaBriefcase className="text-accent" /> Experience
                        </h3>
                        <div className="space-y-8">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.company}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{exp.period}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                            <FaGraduationCap className="text-accent" /> Education
                        </h3>
                        <div className="space-y-8">
                            {education.map((edu, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">{edu.institution}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
