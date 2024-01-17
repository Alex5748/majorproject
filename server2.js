// server2.js

const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongo, getDb } = require('./db/connect'); // Update the path accordingly

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB connection
connectToMongo(); // Call the function to connect to MongoDB

// Endpoint to receive data
app.post('/esp-data', async (req, res) => {
  const dataFromESP = req.body;
  console.log('Data received from ESP8266:', dataFromESP);

  try {
    // Insert data into MongoDB
    const db = getDb();
    const collection = db.collection('test2'); // Replace with your actual collection name

    const result = await collection.insertOne(dataFromESP);
    console.log('Data inserted into MongoDB:', result.ops);

    res.send('Data received and stored in MongoDB successfully');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const start = async () => {
  try {
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
