# 🚀 MERN Stack Portfolio with AI Chatbot

A modern, full-stack personal portfolio website built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It features a premium UI, an Admin Dashboard for content management, and an AI-powered Chatbot to engage visitors.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview) 

## ✨ Features

- **🎨 Modern UI/UX**: Built with **React** and **Tailwind CSS**, featuring dark/light mode, glassmorphism, and smooth animations (Framer Motion).
- **🤖 AI Chatbot**: Integrated **OpenAI** chatbot ("Ask Siddhant AI") that answers questions about skills, projects, and experience.
- **⚡ Admin Dashboard**: Secure admin panel to Add, Edit, and Delete projects dynamically.
- **📱 Fully Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
- **📧 Contact Form**: Functional contact form with email notifications (Nodemailer) and toast alerts.
- **🔐 Secure Auth**: JWT-based authentication for Admin access.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- React Icons
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- OpenAI API
- JSON Web Token (JWT)
- Nodemailer

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/siddhant-gavai/PORTFOLIO.git
cd PORTFOLIO
```

### 2. Install Dependencies
Install dependencies for both **Client** and **Server**.

```bash
# Install root dependencies (concurrently)
npm install

# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create `.env` files in both `server/` and `client/` directories.

**Server (`server/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

From the **root** directory, run:

```bash
npm run dev
```

This command uses `concurrently` to start both the **Backend (Port 5000)** and **Frontend (Port 5173)** simultaneously.

## 📂 Project Structure

```
PORTFOLIO/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, ChatBot, etc.)
│   │   ├── pages/      # Page views (Home, Projects, Admin, etc.)
│   │   ├── context/    # Context API (Auth, Theme)
│   │   └── ...
├── server/             # Node.js Backend
│   ├── controllers/    # Route logic (Auth, Projects, AI)
│   ├── models/         # MongoDB Schemas
│   ├── routes/         # API Endpoints
│   └── ...
└── package.json        # Root configuration
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
