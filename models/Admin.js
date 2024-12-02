// models/Admin.js
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
