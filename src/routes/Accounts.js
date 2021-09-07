const express = require("express")
const router = express.Router()
const Account = require("../models/Account")
const { v4: uuidv4 } = require("uuid")
const get_python = require("../utils/pythondict.js")
const AccountService = require("../services/AccountService")

AccountServiceLayer = new AccountService()

router.get("", async (req, res) => {
  const list_account = await AccountServiceLayer.get_all_accounts()
  res.status(200).json({ data: list_account })
})

router.get("/:account_id", async (req, res) => {
  const response = await AccountServiceLayer.get_one_account(
    req.params.account_id
  )
  res.status(response.message ? 400 : 200).json(response)
})

router.put("/:account_id", async (req, res) => {
  const response = await AccountServiceLayer.update_account(
    req.params.account_id,
    req.body
  )
  return res
    .status(response.message === "Update Successffully" ? 200 : 400)
    .json(response)
})

router.delete("/:account_id", async (req, res) => {
  console.log('entre delete')
  const status = await AccountServiceLayer.delete_account(req.params.account_id)
  res.status(status? 204: 400).json(status? {message: 'Delete Successfully'} : {message: 'Error in delete'})
})

module.exports = router
