// connectdb.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/test/test2';
let db;

const connectToMongo = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    db = client.db(); // Save the reference to the database

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectToMongo, getDb };
