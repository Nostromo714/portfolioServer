const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const port = process.env.PORT;

// Load environment variables from the .env file
dotenv.config();


// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payload
// Basic route 
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
