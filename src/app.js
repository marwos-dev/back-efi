const express = require("express")
const app = express()
require("./utils/mongo")
var cors = require("cors")
const router = express.Router()
const Accounts = require("./routes/Accounts")
const Auth = require("./routes/Auth")
const ListTask = require('./routes/ListTask')
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

/* const docs = require("./documentation") */

const definition = {
  info: {
    title: "Account-api",
    desciption: "Account api for efi programacion 3",
    contact: [
      {
        name: "Marcos Olmedo",
        email: "m.olmedo@itecriocuarto.org.ar",
      },
      {
        name: "Paula ",
        email: "p.@itecriocuarto.org.ar",
      },
      {
        name: "Daniel Galetto",
        email: "d.galetto@itecriocuarto.org.ar",
      },
    ],
    servers: ["http://localhost:3001"],
  },
}
const options = {
  definition,
  apis: ["app.js"],
}

app.use(cors())
app.use(express.json())

app.use("/accounts", Accounts)
app.use("/auth", Auth)
app.use("/list_task", ListTask)

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.set("port", process.env.PORT || 3001)

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})
