const mongoose = require("mongoose");

// UserSchema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  "name": {
    type: String
  },
  "Email": {
    type: String
  },
  status: Number
});

let User = mongoose.model("hero", UserSchema);

module.exports =User

