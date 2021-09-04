const express = require("express")

const app = express()
var cors = require("cors")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const Account = require("./models/Account.js")
const get_python = require("./utils/pythondict.js")
const Accounts = require("./routes/Accounts")
const Auth = require("./routes/Auth")

const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/efi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion a base de datos"))
  .catch((e) => console.log(e))

app.use(cors())
app.use(express.json())

/* Routes */
app.use("/accounts", Accounts)
app.use("/auth", Auth)

// settings
app.set("port", process.env.PORT || 3001)

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})
