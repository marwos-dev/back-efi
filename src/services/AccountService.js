const express = require("express")
const Account = require("../models/Account")
const { v4: uuidv4 } = require("uuid")
const get_python = require("../utils/pythondict.js")

class AccountService {
  async register(data) {
    const counts_user = await Account.countDocuments({ email: data.email })
    if (counts_user >= 1) {
      return { message: "User already register" }
    }
    var new_account = new Account(data)
    new_account.account_id = uuidv4()
    new_account.active = true
    new_account.is_admin = false
    new_account.password_hash = new_account.setPassword(data.password)
    await new_account.save()
    return {
      message: "Register complete",
      data: {
        user: new_account,
      },
    }
  }

  async get_all_accounts() {
    return await Account.find({ active: true })
  }

  async get_one_account(account_id) {
    const account = await Account.findOne({
      account_id: account_id,
      active: true,
    })
    if (!account) {
      return { message: "bad id" }
    }

    return {
      data: account,
    }
  }

  async update_account(account_id, data) {
    let account_data = await this.get_one_account(account_id)
    let account = account_data.data 
    if (!account) {
      return { message: "bad id" }
    } else {
      console.log("entre y aca esta el account", account)
      account.first_name = get_python(
        data,
        "first_name",
        account.first_name
      )
      account.last_name = get_python(
        data,
        "last_name",
        account.last_name
      )
      account.email = get_python(data, "email", account.email)
      console.log("lo edite ", account)
      await account.save()
      console.log("lo guarde")
      return { message: "Update Successffully", data: account }
    }
  }

  async delete_account(account_id){
    console.log('entre de nuevo')
    let account_data = await this.get_one_account(account_id)
    let account = account_data.data 
    console.log('aca esta el account', account)
    if (!account) {
        return false
    }
    if (!account.active) {
        return false
    }
    console.log('pase los if')
    account.active = false
    await account.save()
    console.log('lo guarde')
    return true
  }

}

module.exports = AccountService
