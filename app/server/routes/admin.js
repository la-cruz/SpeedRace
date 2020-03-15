const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.send('Méthode get admin')
})

router.post('/', function (req, res) {
    res.send('Got a POST request')
})

router.put('/', function (req, res) {
    res.send('Got a PUT request at /admin')
})

router.delete('/', function (req, res) {
    res.send('Got a DELETE request at /admin')
})

module.exports = router