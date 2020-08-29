const express = require("express");
const router = express.Router();
const User = require("../models/users");
router.use(express.json());

router.post("/seed", (req, res) => {
  let Users = req.body.data
  User.collection.insertMany(Users, (err, docs) => {
    if (err) {
      res.send("Omo, error de");
      throw err;
    }
    else console.log(docs.length)
    res.send("done");
  })
});

module.exports = router;
