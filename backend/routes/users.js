const express = require("express");
const router = express.Router();
const User = require("../models/users");
const csvToJson = require("csvtojson");
const certificator = require("../certificator");

router.post("/EmailCheck", (req, res) => {
  const email = req.body.email;
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.json({
        success: false,
        message: "User not found",
      });
    } else {
      res.json({
        success: true,
        message: "generate certificate",
      });
    }
  });
});

router.post("/seedTable", (req, res) => {
  const csv = req.body.csv;
  csvToJson()
    .fromFile(csv)
    .then((result) => {
      console.log(result);
      // Now I don't know the columns of the csv
    });
});

module.exports = router;
