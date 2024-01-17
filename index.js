require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect copy");

const PORT = process.env.PORT || 5000;

const tank_routes = require("./routes/tankr");

app.get("/", (req, res) => {
  res.send("Trying to connect WaterTank");
});

app.use("/api/tank", tank_routes);
app.use("/hello", (req, res) => {
  res.send("Hello");
});

const suruwat = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URI);
await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

suruwat();