const express = require('express');
const router = express.Router();

hola = {"hola": "chau"}

router.get('/', (req, res) => {
    res.json({hola: hola})
})




module.exports