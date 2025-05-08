require('dotenv').config();

var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./db');

app.use(express.json());

connectToDatabase()
  .then((db) => {
    app.use('/contacts', require('./routes/contacts')(db));

    app.use('/', require('./routes'));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });