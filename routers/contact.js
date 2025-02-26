const express = require('express');
const Contact = require('../models/modelContact');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a transporter using Gmail SMTP 
const transporter = nodemailer.createTransport({
    service: 'gmail',  // use Gmail's SMTP
    host: 'smtp.gmail.com',
    port: 587,  // You can also use 465 (for SSL)
    secure: false,  // Use false for TLS (port 587)
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, 
    },
});

router.post('/', async (req, res) => {
     
    const { name, email, message } = req.body;

    try {
        // Create a new entry
        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        // now send the email to my email
        const mailOptions = {
            from: email,  // Sender's email (from the form)
            to: process.env.RECIPIENT_EMAIL,  // Recipient's email (your Gmail)
            subject: `New Contact Form Submission from ${name}`,  // Subject of the email
      text: `You have a new submission from ${name} (${email}).\n\nMessage:\n${message}`,  // Email content
    };

    // Send the email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
         console.log('Email sent successfully');
         return res.status(200).json({ success: true, message: 'Message sent successfully.' });
     }
  });

} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
}
});

module.exports = router;