const express = require("express")
const ListTask = require("../models/ListTask")
const { v4: uuidv4 } = require("uuid")
const get_python = require("../utils/pythondict.js")

class ListTaskService {
  async new_list(data) {
    console.log("entre")
    const create = await ListTask.countDocuments({ name: data.name })
    if (create >= 1) {
      return { message: "Name is already register" }
    }
    var new_list = new ListTask(data)
    new_list.list_id = uuidv4()
    await new_list.save()
    console.log(new_list)
    return {
      message: "Register complete",
      data: {
        list: new_list,
      },
    }
  }

  async add_task_in_list(list_id, task_id) {
    let list = await ListTask.findOne({ list_id: list_id })
    console.log("esta es list_id ", list_id)
    console.log("esta es la lista ", list)
    if (!list) {
      return { message: "Bad list_id" }
    }
    if (list.tasks.indexOf(task_id) > -1) {
      return { message: "Task already register in list" }
    }
    list.tasks.push(task_id)
    console.log("esta es list_id ", list_id)
    await list.save()
    return {
      message: "register task in list complete",
    }
  }

  async get_by_status(status){
      list = await ListTask.findOne({status: status})
      if (!list){
          return {message: 'Bad status, insert status already created'}
      }
      return list.list_id
  }

}

module.exports = ListTaskService
