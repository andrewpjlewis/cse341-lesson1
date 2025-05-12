const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  
  // Set SSL/TLS configuration options
  const options = {
    ssl: true,
    tlsAllowInvalidCertificates: false,  // set to true if you are dealing with invalid certificates
    tlsInsecure: false, // set to true if you want to disable certificate verification (not recommended for production)
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  MongoClient.connect(process.env.MONGODB_URI, options)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};