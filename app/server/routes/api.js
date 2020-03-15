const geoResources = require("../src/geoResources");
const listResources = require("../src/listResources");
const express = require('express')
const axios = require('axios')
const router = express.Router()

listResources.push(new geoResources("coucou"));
listResources.push(new geoResources("test"));

function authenticate(jwt) {
    axios.get('http://192.168.75.28:8080/authenticate', {
        headers: {
            origin: 'http://localhost:5500'
        },
        params: {
            token: jwt,
        }
    })
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error);
    })
}

router.get('/resources', function (req, res) {
    authenticate(req.query.token);
    res.send(listResources.list)
})

router.put('/resources/:id/image', function (req, res) {
    listResources.get(req.params.id).url = req.query.url;
    res.send('Got a PUT request at /api')
})

router.put('/resources/:id/position', function (req, res) {
    listResources.get(req.params.id).position = req.query.position;
    res.send('Got a PUT request at /api')
})

module.exports = router;