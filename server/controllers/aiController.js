const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an AI assistant for Siddhant Gavai's professional portfolio website.

Your job is to answer questions about Siddhant’s skills, projects, experience, and availability.

Keep responses:
- Professional
- Confident
- Clear
- Under 120 words

If a question is unrelated to Siddhant or his portfolio, politely guide the user back to relevant topics.

Never provide harmful, illegal, or unrelated information.`;

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
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            max_tokens: 150,
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
