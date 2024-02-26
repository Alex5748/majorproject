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

  
  
    // for water data
    app.route('/esp-data123')
  .get((req, res) => {
    // Handling GET request for /esp-data
    res.send('GET request to /esp-data123');
  })
  .post(async (req, res) => {
    // Handling POST request for /esp-data123
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
    
    
    
    //for waterflow data
    try {
      const db = getDb();
      const collection = db.collection('testwater');

      const result = await collection.insertOne(dataFromESP);
      console.log('Data inserted into MongoDB:', result.ops);

      res.send('Data received and stored in MongoDB successfully');
    } catch (error) {
      console.error('Error storing data in MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });



// Endpoint to retrieve data from MongoDB
app.get('/get-data', async (req, res) => {
    try {
      const db = getDb();
      const collection = db.collection('test2');
  
      // Fetch all documents from the collection
      const documents = await collection.find({}).toArray();
  
      res.json(documents);
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Endpoint to retrieve data from MongoDB for water
app.get('/get-data123', async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('testwater');

    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();

    res.json(documents);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  

// Additional routes
const tank_routes = require("./routes/tankr");
app.get("/", (req, res) => {
  res.send("Trying to connect WaterTank");
});
app.use("/api/tank", tank_routes);
app.use("/hello", (req, res) => {
  res.send("Hello");
});


// Additional routes for waterflow
const tank_routes1 = require("./routes/tankwaterr");
app.get("/", (req, res) => {
  res.send("Trying to connect Waterflow");
});
app.use("/api/tankwaterr", tank_routes1);
app.use("/hi", (req, res) => {
  res.send("Hii");
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
