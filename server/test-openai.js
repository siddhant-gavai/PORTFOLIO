require('dotenv').config();
const OpenAI = require('openai');

console.log('Testing OpenAI Connection...');
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
if (process.env.OPENAI_API_KEY) {
    console.log('API Key length:', process.env.OPENAI_API_KEY.length);
    console.log('API Key start:', process.env.OPENAI_API_KEY.substring(0, 5));
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello' }],
            max_tokens: 10,
        });
        console.log('Success! Response:', completion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Data:', error.response.data);
        }
    }
}

test();
