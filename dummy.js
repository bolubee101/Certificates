const User = require("./models/users");

let Users = [
    {
        Email: "mercyjohnson@gmail.com",
        status: 0,
    },
    {
        Email: "idriselba@gmail.com",
        status: 0,
    },
    {
        Email: "johntravolta@gmail.com",
        status: 0,
    },
    {
        Email: "segunarinze@gmail.com",
        status: 0,
    },
    {
        Email: "lordbee@gmail.com",
        status: 0,
    },
];

let main = () => {
   return new Promise((resolve, reject) => {
        User.collection.insertMany(Users, (err, docs) => {
            if (err) reject("error");
            else resolve();
        });
    });
};
module.exports=main;
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
