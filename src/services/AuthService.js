const express = require("express")

const Account = require("../models/Account")
var jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET || 'ALTACONTRAPAPA'

class Auth {
  async login(email, password) {
    const user = await Account.findOne({ email: email })
    if (!user) {
      return { message: "bad email" }
    }
    if (!user.validPassword(password)) {
      return { message: "bad password" }
    }

    const data_user = {
      identity: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        account_id: user.account_id,
        is_admin: user.is_admin,
      },
    }
    const token = jwt.encode(data_user, secret)

    return {
        message: "Login succesffully",
        data: {
          access_token: token,
        },
      }
  }
}

module.exports = Auth
