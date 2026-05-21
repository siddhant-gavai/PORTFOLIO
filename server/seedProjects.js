const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

// Load environment variables
dotenv.config();

const projects = [
    {
        title: "SkillSwap",
        category: "WEB APP",
        description: "A peer-to-peer skill exchange platform where users trade skills instead of money. Features JWT auth, skill listings, exchange requests, Google Meet & Calendar integration, dashboard, and reviews.",
        techStack: ["React", "Node.js", "MongoDB", "Tailwind", "JWT", "Express"],
        githubLink: "https://github.com/siddhant-gavai/SkillSwap",
        liveLink: "https://skill-swap-seven-tau.vercel.app",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        title: "ListNest",
        category: "WEB APP",
        description: "A full-stack property listing platform for booking accommodations. Features Passport.js auth, full CRUD listings, smart search, category filters, Cloudinary image uploads, review system, and tax toggle.",
        techStack: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js", "Cloudinary"],
        githubLink: "https://github.com/siddhant-gavai/listnest",
        liveLink: "",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        title: "Portfolio — MERN + AI",
        category: "WEB APP",
        description: "This portfolio website — a MERN app with an AI chatbot (OpenAI), Admin Dashboard to manage projects dynamically, dark/light mode, Framer Motion animations, and contact form with Nodemailer.",
        techStack: ["React", "Node.js", "MongoDB", "OpenAI", "Framer Motion", "JWT"],
        githubLink: "https://github.com/siddhant-gavai/PORTFOLIO",
        liveLink: "",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
];

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
        console.log(`Connecting to MongoDB at: ${mongoUri}`);
        await mongoose.connect(mongoUri);
        console.log('Connected to database successfully.');

        // Wipe collection to replace ALL dummy/placeholder entries
        console.log('Wiping existing projects collection...');
        await Project.deleteMany({});
        console.log('Projects collection wiped.');

        console.log('Inserting 3 real projects...');
        await Project.insertMany(projects);

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

seedDB();
