const mongoose = require("../db/conn");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  adminname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
