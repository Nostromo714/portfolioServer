const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from the .env file
const { dbConnect } = require("./db");
const cors = require('cors');
const PORT = process.env.PORT;
const contactRouter = require('./routers/contact')
const path = require('path');


// Connect to MongoDB
dbConnect();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payload

// Basic route 
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Use the contact route
app.use('/contact', contactRouter);

// Serve the React app in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React's build folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    // For any routes that don't match an API route, serve the React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log('Server is running');
});
