const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db('contactsApp');
    return db;
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

module.exports = connectToDatabase;