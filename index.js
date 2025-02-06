const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from the .env file
const { dbConnect } = require("./db");
const cors = require('cors');
const PORT = process.env.PORT;


// Connect to MongoDB
dbConnect();


// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payload

// Basic route 
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


// Start the server
app.listen(PORT, () => {
    console.log('Server is running');
});
