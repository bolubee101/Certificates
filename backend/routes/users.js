const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/seed", (req, res) => {
  let Users=req.body;
  User.collection.insertMany(Users,(err,docs)=>{
   if(err) throw err;
   else console.log(docs.length)
   res.send("done");
   })
});

module.exports = router;
