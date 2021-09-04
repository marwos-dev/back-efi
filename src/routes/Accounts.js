const express = require("express")
const router = express.Router()
const Account = require("../models/Account")
const { v4: uuidv4 } = require("uuid")
const get_python = require("../utils/pythondict.js")

router.get("", async (req, res) => {
  console.log("entre al get all")
  let list_account = await Account.find({ active: true })
  debugger
  console.log(list_account)
  res.json({ data: list_account })
})

router.post("", async (req, res) => {
  data = req.body
  console.log("aca esta la data")
  console.log(data)
  counts_user = await Account.countDocuments({ email: req.body.email })
  console.log("ese es el count user", counts_user)
  if (counts_user >= 1) {
    res.status(400).json({ message: "Usuario registrado" })
  }
  try {
    var new_account = new Account(req.body)
    new_account.account_id = uuidv4()
    new_account.active = true
    new_account.is_admin = false
    console.log("antes")
    new_account.password_hash = new_account.setPassword(req.body.password)
    console.log(new_account)
    await new_account.save()
    res.json(new_account)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get("/:account_id", async (req, res) => {
  const account = await Account.findOne({
    account_id: req.params.account_id,
    active: true,
  })
  if (!account) {
    res.json({ message: "bad id" })
  }
  res.json(account)
})

router.put("/:account_id", async (req, res) => {
  try {
    console.log("entre al put")
    let account = await Account.findOne({
      account_id: req.params.account_id,
      active: true,
    })
    console.log(account)
    const request = req.body
    console.log("la request", request)
    if (!account) {
      res.json({ message: "bad id" })
    } else {
      account.first_name = get_python(request, "first_name", account.first_name)
      account.last_name = get_python(request, "last_name", account.last_name)
      account.email = get_python(request, "email", account.email)
      await account.save()
      res.json({ message: "ok" })
    }
  } catch (err) {
    res.json({ message: "error en update" })
  }
})

router.delete("/:account_id", async (req, res) => {
  try {
    console.log("entre delete")
    let account = await Account.findOne({ account_id: req.params.account_id })
    const request = req.body
    console.log(account)
    if (!account) {
      res.json({ message: "bad account_id" })
    }
    if (!account.active) {
      res.json({ message: "account is already deleted" })
    }
    account.active = false
    await account.save()
    res.status(204)
  } catch (err) {
    res.json({ message: "error en update" })
  }
})

module.exports = router
