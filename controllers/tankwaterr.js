const Tank = require("../models/tankwaterr");

const getAllUsers1 = async (req, res) => {
  const myData = await Tank.find(req.query);
  res.status(200).json({ myData });
};

const getAllUsersTesting1 = async (req, res) => {
  res.status(200).json({ msg: " I am getting all users data here" });
};

module.exports = { getAllUsers1, getAllUsersTesting1 };
