const geoResources = require("../src/geoResources");
const listResources = require("../src/listResources");
const express = require('express')
const axios = require('axios')
const router = express.Router()

listResources.push(new geoResources("coucou"));
listResources.push(new geoResources("test"));

function authenticate(jwt) {
    var bool = false;

    return axios.get('http://192.168.75.28:8080/authenticate', {
        headers: {
            origin: 'http://192.168.75.28:8080'
        },
        params: {
            token: jwt,
        }
    })
    .then(function(response) {
        console.log(response.status)
        if(response.status === 204) {
            bool = true;
        }
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function() {
        return bool;
    })
}

router.get('/resources', function (req, res) {
    authenticate(req.headers.token)
    .then(function(bool) {
        bool ? res.send(listResources.list) : res.send("You're not connected");
    })
})

router.put('/resources/:id/image', function (req, res) {
    authenticate(req.headers.token)
    .then(function(bool) {
        if(bool) {
            listResources.get(req.params.id).url = req.query.url;
            res.send('Got a PUT request at /api')
        } else {
            res.send("You're not connected");
        } 
    })
})

router.put('/resources/:id/position', function (req, res) {
    authenticate(req.headers.token)
    .then(function(bool) {
        if(bool) {
            listResources.get(req.params.id).position = req.query.position;
            res.send('Got a PUT request at /api')
        } else {
            res.send("You're not connected");
        } 
    })
})

module.exports = router;