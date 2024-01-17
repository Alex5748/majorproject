const express = require("express");
const router = express.Router();

const { getAllUsers, getAllUsersTesting } = require("../controllers/tankc");

router.route("/").get(getAllUsers);
router.route("/testing").get(getAllUsersTesting);

module.exports = router;
 