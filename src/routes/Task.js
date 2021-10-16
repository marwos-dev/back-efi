const express = require("express")
const router = express.Router()
const TaskService = require("../services/TaskService")

const TaskServiceLayer = new TaskService()

router.post("", async (req, res) => {
  const response = await TaskServiceLayer.create_task(req.body)
  res.status(response.message != "Task register" ? 400 : 201).json(response)
})

router.put("/:task_id", async (req, res) => {
  const response = await TaskServiceLayer.update_task(
    req.body,
    req.params.task_id
  )
  res
    .status(response.message != "Update task succesfully" ? 400 : 200)
    .json(response)
})

router.post("/:task_id", async (req, res) => {
    const response = await TaskServiceLayer.add_responsible(
      req.params.tas_id,
      req.body.account_id
    )
    res
      .status(response.message != "The person in charge was assigned" ? 400 : 200)
      .json(response)
  })

module.exports = router
