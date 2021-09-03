const express = require("express")

const app = express()
var cors = require("cors")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const Person = require("./models/Person.js")
const get_python = require("./utils/pythondict.js")

const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/agenda", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion a base de datos"))
  .catch((e) => console.log(e))

app.use(cors())
app.use(express.json())

// import routes
app.get("/person", async (req, res) => {
  console.log("entre al get all")
  let list_person = await Person.find({ active: true })
  debugger
  console.log(list_person)
  res.json({ data: list_person })
})

app.post("/person", async (req, res) => {
  data = req.body
  console.log(data)
  try {
    const new_person = new Person(req.body)
    new_person.person_id = uuidv4()
    new_person.active = true
    await new_person.save()
    res.json(new_person)
  } catch (err) {
    res.json({ message: err })
  }
})

app.get("/person/:id", async (req, res) => {
  const person = await Person.findOne({
    person_id: req.params.id,
    active: true,
  })
  if (!person) {
    res.json({ message: "bad id" })
  }
  res.json(person)
})

app.put("/person/:id", async (req, res) => {
  try {
    console.log("entre al put")
    let person = await Person.findOne({
      person_id: req.params.id,
      active: true,
    })
    const request = req.body
    console.log("la request", request)
    if (!person) {
      res.json({ message: "bad id" })
    } else {
      person.first_name = get_python(request, "first_name", person.first_name)
      person.last_name = get_python(request, "last_name", person.last_name)
      person.email = get_python(request, "email", person.email)
      person.phone = get_python(request, "phone", person.phone)
      person.dni = get_python(request, "dni", person.dni)
      
      await person.save()
      res.json({ message: "ok" })
    }
  } catch (err) {
    res.json({ message: "error en update" })
  }
})

app.delete("/person/:id", async (req, res) => {
  try {
    let person = await Person.findOne({ person_id: req.params.id })
    const request = req.body
    if (!person) {
      res.json({ message: "bad id" })
    }
    person.active = false
    await person.save()
  } catch (err) {
    res.json({ message: "error en update" })
  }
})

// settings
app.set("port", process.env.PORT || 3001)

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})
