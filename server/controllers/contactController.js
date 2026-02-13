const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Send a message
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save to database
        const newMessage = await Message.create({ name, email, message });

        // Send email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Message from ${name}`,
            text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                // We still return success if DB save worked, but maybe log this
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMessage };
