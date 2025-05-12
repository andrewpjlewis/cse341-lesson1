const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  
  // Set SSL/TLS configuration options (ignoring invalid certificates)
  const options = {
    ssl: true,
    tlsAllowInvalidCertificates: true, // Only keep this if you want to ignore invalid certificates
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