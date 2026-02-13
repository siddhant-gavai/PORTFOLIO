# Deployment Guide

## Prerequisites
- GitHub Account
- Accounts on deployment platforms (e.g., Render, Vercel, Netlify)
- MongoDB Atlas Account (for cloud database)

## 1. Database Setup (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist your IP (or allow all `0.0.0.0/0` for production).
3. Get the Connection String (URI). It looks like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`.

## 2. Server Deployment (Render)
1. Push your code to a GitHub repository.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
6. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A strong secret key.
   - `EMAIL_USER`: Your Gmail address (for Nodemailer).
   - `EMAIL_PASS`: Your Gmail App Password (not your login password).
   - `CLIENT_URL`: The URL of your deployed frontend (you will get this in step 3).
   - `PORT`: `10000` (Render default).

## 3. Client Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-api.onrender.com`).
6. Deploy.

## 4. Final Configuration
1. Go back to Render (Server) and update `CLIENT_URL` with your actual Vercel domain (e.g., `https://your-portfolio.vercel.app`).
2. Update `VITE_API_URL` in Vercel if it changed.

## Local Development
1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```
2. Create `.env` files in `server/` and `client/` as per the source code.
3. Run concurrently:
   ```bash
   npm run dev
   ```
