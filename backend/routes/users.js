const express = require("express");
const router = express.Router();
const User = require("../models/users");
const csvToJson = require("csvtojson");

router.post("/seed", (req, res) => {
  let Users=req.body;
  for(i in Users){
    let newUser= new User(Users[i]);
    newUser.save((err,user)=>{
        if(err){
           console.log(err);
        }else{
           console.log(user["First Name"],"has been logged")
        }
        if(i == Users.length - 1){
           db.close();
        }
 });
}
});

module.exports = router;
