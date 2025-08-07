const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Setup transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailToSchool = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: '📬 New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="text-align: center; padding: 20px;">
                    <img src="/images/Logo.jpg" alt="School Logo" style="max-width: 150px; height: auto;" />
                </div>
                <div style="background-color: #047331; color: white; padding: 16px 24px;">
                    <h2 style="margin: 0; font-size: 20px;">📬 New Contact Form Submission</h2>
                </div>
                <div style="padding: 24px;">
                    <p><strong>👤 Name:</strong> ${name}</p>
                    <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>💬 Message:</strong></p>
                    <div style="background: #f1f1f1; padding: 12px 16px; border-radius: 5px; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                <div style="padding: 16px 24px; background-color: #f1f1f1; text-align: center; font-size: 12px; color: #666;">
                    This message was submitted via the website contact form.
                </div>
            </div>
        </div>
        `
    };

    const autoReplyToUser = {
        from: `"Thengisangaye Primary School" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: process.env.EMAIL_USER,
        subject: 'Thank you for contacting Thengisangaye Primary School',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 8px solid #007B5E;">
                <h2 style="background-color: #007B5E; color: white; padding: 15px; border-radius: 8px 8px 0 0; margin: 0;">📬 Message Received</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for contacting <strong>Thengisangaye Primary School</strong>. Your message has been successfully received. One of our team members will get back to you as soon as possible.</p>
                <p style="font-weight:bold; margin-top:20px;">Here is a copy of your message:</p>
                <div style="background-color: #fef7e0; border: 2px dashed #ffc107; padding: 15px; font-size: 15px; line-height: 1.5; margin-top: 10px; color: #444;">
                    ${message}
                </div>
                <p style="margin-top: 30px; font-size: 14px; color: #777; text-align: center;">
                    Best regards,<br/>Thengisangaye Primary School
                </p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailToSchool);
        await transporter.sendMail(autoReplyToUser);
        res.status(200).json({ message: '✅ Your message was sent, and we replied via email!' });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

// Fallback route to serve index.html for all other paths (for SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public'))); 
// Make sure your index.html, CSS, JS are inside a folder named "public"

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Setup transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email to school
    const mailToSchool = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: '📬 New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="text-align: center; padding: 20px;">
                    <img src="/images/Logo.jpg" alt="School Logo" style="max-width: 150px; height: auto;" />
                </div>
                <div style="background-color: #047331; color: white; padding: 16px 24px;">
                    <h2 style="margin: 0; font-size: 20px;">📬 New Contact Form Submission</h2>
                </div>
                <div style="padding: 24px;">
                    <p><strong>👤 Name:</strong> ${name}</p>
                    <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>💬 Message:</strong></p>
                    <div style="background: #f1f1f1; padding: 12px 16px; border-radius: 5px; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                <div style="padding: 16px 24px; background-color: #f1f1f1; text-align: center; font-size: 12px; color: #666;">
                    This message was submitted via the website contact form.
                </div>
            </div>
        </div>
    `
    };

    // Auto-reply email to user
    const autoReplyToUser = {
        from: `"Thengisangaye Primary School" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: process.env.EMAIL_USER,
        subject: 'Thank you for contacting Thengisangaye Primary School',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 8px solid #007B5E;">
                <h2 style="background-color: #007B5E; color: white; padding: 15px; border-radius: 8px 8px 0 0; margin: 0;">📬 Message Received</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for contacting <strong>Thengisangaye Primary School</strong>. Your message has been successfully received. One of our team members will get back to you as soon as possible.</p>
                <p style="font-weight:bold; margin-top:20px;">Here is a copy of your message:</p>
                <div style="background-color: #fef7e0; border: 2px dashed #ffc107; padding: 15px; font-size: 15px; line-height: 1.5; margin-top: 10px; color: #444;">
                    ${message}
                </div>
                <p style="margin-top: 30px; font-size: 14px; color: #777; text-align: center;">
                    Best regards,<br/>Thengisangaye Primary School
                </p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailToSchool);
        await transporter.sendMail(autoReplyToUser);
        res.status(200).json({ message: '✅ Your message was sent, and we replied via email!' });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

// Route for index.html (fallback for all other routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


