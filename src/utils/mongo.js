const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/efi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion a base de datos"))
  .catch((e) => console.log(e))