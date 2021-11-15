const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Task = new Schema({
  task_id: String,
  list_id: String,
  responsibles: [String],
  status: Boolean,
  description: String,
  title: String
})


module.exports = mongoose.model("task", Task)