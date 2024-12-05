const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Admin = mongoose.model(
  "Admin",
  new Schema({
    adminname: { type: String, required: true },
    password: { type: String, required: true },
  })
);

module.exports = Admin;
