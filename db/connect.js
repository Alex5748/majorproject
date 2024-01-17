const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

let db;

const connectToMongo = async () => {
  try {
    // const uri = 'mongodb://localhost:27017';
    
    const uri = 'mongodb+srv://user:1234567890@cluster0.8yyyrll.mongodb.net/'; // Update the MongoDB URI
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

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("Error connecting a database");
    throw error;
  }
};

module.exports = { connectToMongo, getDb, connectDB };
