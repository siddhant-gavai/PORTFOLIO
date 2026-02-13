/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode manually
    theme: {
        extend: {
            colors: {
                primary: '#0f0f0f',
                accent: '#00f7ff', // Cyan / Neon Green-ish
                secondary: '#1a1a1a',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
