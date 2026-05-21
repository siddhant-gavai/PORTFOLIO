const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an expert AI assistant representing Siddhant Gavai, a highly skilled Full Stack Developer.
Your goal is to inform and impress potential clients, recruiters, and visitors about Siddhant's skills, projects, work experience, and availability.

Siddhant is highly experienced in the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS, UI/UX, and cloud platforms.

Keep responses:
- Professional, welcoming, and enthusiastic.
- Clear, concise, and engaging (under 120 words).
- Structured with bullet points if listing multiple items.

If a question is completely unrelated to Siddhant, his career, or this portfolio, politely and elegantly guide the visitor back to topics about his work.
Never share harmful, inappropriate, or illegal information.`;

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        console.log('AI Chat Request received:', message);
        console.log('API Key configured:', !!process.env.OPENAI_API_KEY);

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            console.error('Missing OpenAI API Key');
            return res.status(500).json({ error: 'Server Error: API Key not configured.' });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        const reply = completion.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.error('OpenAI Error:', error);
        if (error.response) {
            // OpenAI returns { error: { message: "..." } }
            const errorMessage = error.response.data?.error?.message || 'OpenAI API Error';
            return res.status(error.response.status).json({ error: errorMessage });
        }
        res.status(500).json({ error: 'Failed to generate response' });
    }
};

module.exports = { chatWithAI };
