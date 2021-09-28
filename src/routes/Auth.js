const express = require("express")
const router = express.Router()
const Account = require("../models/Account")
const sign = require("jwt-encode")
const Auth = require("../services/AuthService")
const AccountService = require("../services/AccountService")
require("dotenv").config()
const secret = process.env.JWT_SECRET

AuthService = new Auth()
AccountServiceLayer = new AccountService()

router.post("/login", async (req, res) => {
  const response = await AuthService.login(req.body.email, req.body.password)
  return res
    .status(response.message === "Login succesffully" ? 200 : 404)
    .json(response)
})

router.post("/register", async (req, res) => {
  const response = await AccountServiceLayer.register(req.body)
  return res
    .status(response.message === "Register complete" ? 200 : 400)
    .json(response)
})

module.exports = router
