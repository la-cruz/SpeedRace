const express = require('express')
const router = express.Router()
const axios = require('axios')
const game = require("../src/game")

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

router.put('/start', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            game.start()
            game.name = req.query.name
            res.send("Game Started")
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/stop', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            game.stop()
            res.send("Game Stopped")
        } else {
            res.send("You're not connected")
        }
    })
})

router.get('/status', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        bool ? res.send(game) : res.send("You're not connected");
    })
})

module.exports = router