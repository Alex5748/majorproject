const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Endpoint to receive data
app.post('/esp-data', (req, res) => {
  const dataFromESP = req.body;
  console.log('Data received from ESP8266:', dataFromESP);
  res.send('Data received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
