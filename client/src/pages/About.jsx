import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaDownload } from 'react-icons/fa';

const About = () => {
    const skills = [
        { name: 'React.js', level: 'Advanced' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'Express.js', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'Git & GitHub', level: 'Intermediate' },
        { name: 'Python', level: 'Basic' },
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
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-80 transition-all transform hover:scale-105 shadow-lg shadow-accent/20"
                    >
                        <FaDownload /> Download Resume
                    </a>
                </motion.div>

                {/* Skills Section */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
                        Skills & Technologies
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-secondary p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
                            >
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}</span>
                            </motion.div>
                        ))}
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
