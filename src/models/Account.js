const mongoose = require("mongoose")
const Schema = mongoose.Schema
var crypto = require("crypto")

const Account = new Schema({
  account_id: String,
  first_name: String,
  last_name: String,
  active: Boolean,
  email: String,
  is_admin: Boolean,
  hash: String,
  salt: String
})

Account.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex")

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
}

Account.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};

module.exports = mongoose.model("accounts", Account)
