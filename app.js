const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");
const User = require("./models/users");
const certificator = require("./certificator");
const session = require("express-session");
const dummy = require("./dummy")
const MongoStore = require('connect-mongo')(session);
const csvtojson = require('csvtojson');
const multer = require('multer');
const path = require('path');
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

// initialize app
const app = express();
app.use(
  session({
    secret: "secret-key",
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

// defining the middle wares
app.use(cors());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// bringing the user routes
const users = require("./routes/users");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/EmailCheck", (req, res) => {
  req.session.status = false;
  req.session.email = "";
  let email = req.query.email;
  console.log(email);
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.sendFile(__dirname + "/views/opps.html");
    } else {
      if (user.status == 1) {
        let name = user.name;
        certificator(email, name).then(() => {
          req.session.email = email;
          res.redirect("/oops");
        })
      } else {
        req.session.status = true;
        req.session.email = email;
        res.redirect("/generatorPage");
      }
    }
  });
});

app.get("/generatorPage", (req, res) => {
  if (req.session.status) {
    res.sendFile(__dirname + "/views/generator.html");
  } else {
    res.redirect("/");
  }
});

app.post("/generate", (req, res) => {
  let email = "";
  email = req.session.email;
  console.log(email + "ddd");
  let name = req.body.name;
  req.session.name = "";
  req.session.name = name;
  console.log(req.body);
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.sendFile(__dirname + "/views/opps.html");
    }
    if (user.status == 1) {
      res.json({
        success: false,
        message: "Certificate has been generated",
      });
    } else {
      if (req.session.status == true) {
        certificator(email, name).then(() => {
          user.status = 1;
          user.name = name;
          user.save((err, user) => {
            if (err) throw err;
            else {
              res.status(200);
              res.json({
                success: true,
                message: "you may download",
              });
            }
          });
        });
      } else {
        res.json({
          success: false,
        });
      }
    }
  });
});

app.get("/download", (req, res) => {
  if (req.session.email == "" || !req.session.email) {
    res.redirect("/");
  } else {
    res.status(200);
    res.download(
      __dirname + `/certificates/${req.session.email}.pdf`,
      `DSC_certificate.pdf`
    );
  }
});
app.get("/congrats", (req, res) => {
  if (req.session.name != "") {
    res.sendFile(__dirname + "/views/congrats.html");
  } else {
    res.redirect("/");
  }
});

<<<<<<< HEAD
app.get("/oops",(req,res)=>{
  res.sendFile(__dirname+"/views/opps2.html");
});

app.get("/upload-csv", (req, res) => {
  res.sendFile(__dirname + "/views/csv-upload.html");
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/csv/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post("/upload-csv", upload.single('FileUpload'), (req, res, next) => {
  // res.send(req.file);
  // res.send(__dirname + "\\" + req.file.path);
  console.log(req);
  csvtojson(__dirname + "\\" + req.file.path)
    .fromFile()
    .then((result) => {
      res.send(result);
    })
=======
app.get("/oops", (req, res) => {
  res.sendFile(__dirname + "/views/opps2.html");
>>>>>>> origin/master
})

app.get("/dummy", (req, res) => {
// if error, possible cause - Database does not exist

  db.dropCollection(
    "users",
    function (err, result) {
      if (err){
        dummy().then(() => {
          res.send("done seeding")
        })
      }
      else {
        dummy().then(() => {
          res.send("done seeding")
        })
      }
    }
  );

})

app.use("/", users);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
