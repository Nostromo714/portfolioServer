const express = require('express');
const Contact = require('../models/modelContact');
const router = express.Router();

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

        res.status(200).json({ success: true, message: 'Message sent successfully.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'something went wrong, please try again' });  
     }    
});

module.exports = router;