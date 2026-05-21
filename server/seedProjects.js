const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

// Load environment variables
dotenv.config();

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubLink: 'https://github.com',
        liveLink: 'https://example.com',
        category: 'Web App',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'Task Management App',
        description: 'Productivity tool for teams to manage tasks, collaborate in real-time, and track progress.',
        techStack: ['React', 'Firebase', 'Tailwind'],
        githubLink: 'https://github.com',
        liveLink: 'https://example.com',
        category: 'Web App',
        imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'Portfolio Website',
        description: 'Personal portfolio website showing skills, projects and contact info.',
        techStack: ['React', 'Tailwind', 'Framer Motion'],
        githubLink: 'https://github.com',
        liveLink: 'https://example.com',
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'SkillSwap',
        description: 'A peer-to-peer skill exchange platform where users trade skills instead of money. Features JWT auth, skill listings with categories, exchange requests, Google Meet & Calendar integration, a personal dashboard, and a user review system.',
        techStack: ['React (Vite)', 'Tailwind CSS', 'Lucide React', 'Axios', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT', 'BCrypt'],
        githubLink: 'https://github.com/siddhant-gavai/SkillSwap',
        liveLink: 'https://skill-swap-seven-tau.vercel.app',
        category: 'Full Stack / MERN',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'ListNest',
        description: 'A full-stack property listing platform for exploring and booking unique accommodations worldwide. Features Passport.js auth, full CRUD for listings, smart search, category filters, Cloudinary image uploads, a review system, and tax toggle.',
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS', 'Passport.js', 'Tailwind CSS', 'Bootstrap 5', 'Multer', 'Cloudinary', 'Joi'],
        githubLink: 'https://github.com/siddhant-gavai/listnest',
        liveLink: '',
        category: 'Full Stack / MEN Stack',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'My Portfolio (MERN + AI)',
        description: 'This portfolio website itself — a full-stack MERN app with an AI chatbot powered by OpenAI ("Ask Siddhant AI"), a secure Admin Dashboard to manage projects dynamically, dark/light mode, Framer Motion animations, and a contact form with email notifications via Nodemailer.',
        techStack: ['React.js (Vite)', 'Tailwind CSS', 'Framer Motion', 'React Icons', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'OpenAI API', 'JWT', 'Nodemailer'],
        githubLink: 'https://github.com/siddhant-gavai/PORTFOLIO',
        liveLink: '',
        category: 'Full Stack / MERN',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
];

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
        console.log(`Connecting to MongoDB at: ${mongoUri}`);
        await mongoose.connect(mongoUri);
        console.log('Connected to database successfully.');

        for (const projectData of projects) {
            // Check if project exists by title
            const existingProject = await Project.findOne({ title: projectData.title });
            if (existingProject) {
                console.log(`Project "${projectData.title}" already exists. Updating details...`);
                await Project.updateOne({ _id: existingProject._id }, projectData);
            } else {
                console.log(`Project "${projectData.title}" does not exist. Creating new...`);
                const newProject = new Project(projectData);
                await newProject.save();
            }
        }

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

seedDB();
