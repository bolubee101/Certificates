const User=require("./models/users");
const mongoose = require("mongoose");
const config=require("./config/database")

// connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongodb connection established");
});
let Users=[
    {
        "Email":"mercyjohnson@gmail.com",
        "status":0
    },
    {
        "Email":"idriselba@gmail.com",
        "status":0
    },
    {
        "Email":"johntravolta@gmail.com",
        "status":0
    },
    {
        "Email":"segunarinze@gmail.com",
        "status":0
    },
    {
        "Email":"lordbee@gmail.com",
        "status":0
    }
]

User.collection.insertMany(Users,(err,docs)=>{
if(err) throw err;
else console.log(docs.length)
db.close()
})

/*for(i in Users){
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
}*/
