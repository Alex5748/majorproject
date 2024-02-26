const express = require("express");
const router = express.Router();

const { getAllUsers1, getAllUsersTesting1 } = require("../controllers/tankwaterr");

router.route("/").get(getAllUsers1);
router.route("/testingwater").get(getAllUsersTesting1);

module.exports = router;
 