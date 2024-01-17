const express = require('express');
const MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(express.json())