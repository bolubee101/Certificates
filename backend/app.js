const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/database");
const User = require("./models/users");
const certificator = require("./certificator");
const session = require("express-session");
const url = require("url");
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
    resave: false,
    saveUninitialized: false,
  })
);
const PORT = process.env.PORT || 3000;

// defining the middle wares
app.use(cors());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// bringing the user routes
const users = require("./routes/users");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/EmailCheck", (req, res) => {
  req.session.status = false;
  let email = req.query.email;
  console.log(email);
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.sendFile(__dirname + "/views/opps.html");
    } else {
      req.session.status = true;
      req.session.email = email;
      res.redirect("/generator");
    }
  });
});

app.get("/generate", (req, res) => {
  let email = req.session.email;
  console.log(email + "ddd");
  let name = req.query.name;
  console.log(name);
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.sendFile(__dirname + "/views/opps.html");
    } if (user.status == 1) {
      res.json({
        success: false,
        message: "Certificate has been generated",
      });
    }
    else {
      if (req.session.status == true) {
        certificator(name).then(() => {
          user.status = 1;
          user.save((err, user) => {
            if (err) throw err;
            else {
              res.status(200);
              res.download(
                __dirname + `/certificates/${name}.pdf`,
                `${name}DSC_certificate.pdf`
              );
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

// not my greatest endpoint name sha
app.get("/generator", (req, res) => {
  res.sendFile(__dirname + "/views/generator.html");
});
app.use("/", users);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});