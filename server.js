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
<<<<<<< HEAD
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
=======
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
>>>>>>> parent of 40f381a (L04 api documentation)
