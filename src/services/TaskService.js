const express = require("express")
const Task = require("../models/Task")
const { v4: uuidv4 } = require("uuid")
const get_python = require("../utils/pythondict.js")
const ListTaskService = require('../services/ListTaskService')

const ListTaskServiceLayer = ListTaskService()

class TaskService {
    async create_task(data){
       var task = new Task(data)
       task.task_id = uuidv4()
       await task.save()
       return {
           message: 'Task register',
           data: {
               task: task
           }
       }

    }

    async update_task(data, task_id){
        let task = await Task.findOne({ task_id: task_id })
        if (!task) {
          return { message: "Bad task_id" }
        }
        task.title = get_python(data, 'title', task.title)
        if (data.status != task.status){
            task.list_id = ListTaskServiceLayer.get_by_status(data.status)
            task.status = get_python(data, 'status', task.status)
        }
        
        task.description = get_python(data, 'description', task.description)
        task.title = get_python(data, 'title', task.title)
        await task.save()
        return {
            message: 'Update task succesfully',
            data: task
        }
    }

    async delete_task(task_id){
        let task = await Task.findOne({ task_id: task_id })
        if (!task) {
          return { message: "Bad task_id" }
        }
        await task.remove()
    }

    async add_responsible(task_id, account_id){
        let task = await Task.findOne({ task_id: task_id })
        if (task.responsibles.indexOf(account_id) > -1){
            return {message: 'Account already register in task'}
        }
        task.responsibles.push(account_id)
        await task.save()
        return {
            message: "The person in charge was assigned"
        }
    }
}


module.exports = TaskService