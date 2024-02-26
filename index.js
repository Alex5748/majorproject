// Import necessary modules
const express = require("express");
const { connectToMongo, getDb } = require('./db/connect');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection
connectToMongo();

// Endpoint to receive data from ESP
app.route('/esp-data')
  .get((req, res) => {
    // Handling GET request for /esp-data
    res.send('GET request to /esp-data');
  })
  .post(async (req, res) => {
    // Handling POST request for /esp-data
    const dataFromESP = req.body;
    console.log('Data received from ESP8266:', dataFromESP);

    try {
      const db = getDb();
      const collection = db.collection('test2');

      const result = await collection.insertOne(dataFromESP);
      console.log('Data inserted into MongoDB:', result.ops);

      res.send('Data received and stored in MongoDB successfully');
    } catch (error) {
      console.error('Error storing data in MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Endpoint to receive waterflow data from ESP
app.route('/esp-waterflow-data')
  .get((req, res) => {
    // Handling GET request for /esp-waterflow-data
    res.send('GET request to /esp-waterflow-data');
  })
  .post(async (req, res) => {
    // Handling POST request for /esp-waterflow-data
    const waterflowDataFromESP = req.body;
    console.log('Waterflow data received from ESP8266:', waterflowDataFromESP);

    try {
      const db = getDb();
      const collection = db.collection('test123');

      const result = await collection.insertOne(waterflowDataFromESP);
      console.log('Waterflow data inserted into MongoDB:', result.ops);

      res.send('Waterflow data received and stored in MongoDB successfully');
    } catch (error) {
      console.error('Error storing waterflow data in MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Endpoint to retrieve the last data from MongoDB for test2 collection
app.get('/get-latest-test2-data', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('test2');

        // Fetch the last document from the collection
        const latestDocument = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();

        res.json(latestDocument);
    } catch (error) {
        console.error('Error retrieving latest test2 data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to retrieve the last data from MongoDB for test123 collection
app.get('/get-latest-test123-data', async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('test123');

        // Fetch the last document from the collection
        const latestDocument = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();

        res.json(latestDocument);
    } catch (error) {
        console.error('Error retrieving latest test123 data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
