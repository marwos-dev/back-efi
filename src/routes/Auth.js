const express = require("express")
const router = express.Router()
const Account = require("../models/Account")
const sign = require("jwt-encode")
require("dotenv").config()
const secret = process.env.JWT_SECRET 

console.log("esta es la secret key", secret)
router.post("/login", async (req, res) => {
  const user = await Account.findOne({ email: req.body.email })
  if (!user) {
    res.status(400).json({ message: "bad email" })
  }
  if (!user.validPassword(req.body.password)) {
    res.status(400).json({ message: "bad password" })
  }
  const data_user = {
    identity: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      account_id: user.account_id,
      is_admin: user.is_admin
    },
  }
  const jwt = sign(data_user, secret)
  return res.status(200).json({
    message: "Login succesffully",
    data: {
      access_token: jwt,
    },
  })
})

module.exports = router
