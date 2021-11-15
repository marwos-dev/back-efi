const express = require("express")
const router = express.Router()
const ListTaskService = require("../services/ListTaskService")

const ListTaskServiceLayer = new ListTaskService()

router.post("", async (req, res) => {
  const response = await ListTaskServiceLayer.new_list(req.body)
  res.status(response.message != 'Register complete' ? 400 : 201).json(response)
})

router.post("/:list_id", async (req, res) => {
  const response = await ListTaskServiceLayer.add_task_in_list(
    req.params.list_id,
    req.body.task_id
  )
  res.status(response.message != 'register task in list complete' ? 400 : 200).json(response)
})

module.exports = router
