const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/database");
const User = require("./models/users");
const certificator = require("./certificator");
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

const PORT = process.env.PORT || 3000;

// defining the middle wares
app.use(cors());

app.use(bodyParser.json());

// bringing the user routes
const users = require("./routes/users");

app.post("/generate", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  User.findOne({ Email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      res.json({
        success: false,
        message: "User not found",
      });
    } else {
      if (user.status == 1) {
        res.status(400);
        res.json({
          success: false,
          message: "certificate has been downloaded",
        });
      } else {
        certificator(name).then(() => {
          user.status = 1;
          user.save((err, user) => {
            if (err) throw err;
            else {
              res.status(200);
              res.download(
                __dirname + `/certificates/${name}.pdf`,
                `${name}DSC_certificate`
              );
            }
          });
        });
      }
    }
  });
});
app.use("/", users);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
