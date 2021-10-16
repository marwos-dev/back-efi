const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ListTask = new Schema({
  list_id: String,
  status: String,
  name: String,
  tasks: [String],
})

module.exports = mongoose.model("list_task", ListTask)