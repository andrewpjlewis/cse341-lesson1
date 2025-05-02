require('dotenv').config();  // Load environment variables

var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./db'); // Import the MongoDB connection

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB before starting the server
connectToDatabase()
  .then((db) => {
    // Use the contacts route and pass the db connection to it
    app.use('/contacts', require('./routes/contacts')(db));  // Pass db connection to the routes

    // Example of another route if needed
    app.use('/', require('./routes'));  // You can keep this route as you mentioned in your second code snippet

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });