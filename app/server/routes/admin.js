const express = require('express')
const router = express.Router()
const axios = require('axios')
const game = require("../src/game")
const geoResources = require("../src/geoResources")

function authenticate(jwt) {
    var bool = false;

    return axios.get('http://192.168.75.28:8080/authenticate', {
        headers: {
            origin: 'https://192.168.75.28'
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

router.get('/', function (req, res) {
    errors = []
    res.render('index', {
        errors
    })
})

router.post('/ttl', function (req, res) {
    game.setTtl(req.body.ttl);
    errors = []
    res.render('index', {
        errors
    })
})

router.post('/target', function (req, res) {
    errors = []
    if(game.started) {
        if(!game.getRessource('target')) {
            game.addRessource(new geoResources('target'))
        }
        game.getRessource('target').position = [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
    } else {
        errors.push("La partie n'a pas commencée")
    }
    res.render('index', {
        errors
    })
})

router.post('/start', function (req, res) {
    errors = []

    game.start()
    game.name = req.body.gameName

    res.render('index', {
        errors
    })
})

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

router.post('/stop', function (req, res) {
    game.stop()
    res.send("Game Stopped")
})

router.put('/target', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            let position = []
            if(req.query.auto) {
                position[0] = parseFloat(req.query.latitude) + ((Math.random() - 0.5)/10)
                position[1] = parseFloat(req.query.longitude) + ((Math.random() - 0.5)/10)
            } else {
                position[0] = parseFloat(req.query.latitude)
                position[1] = parseFloat(req.query.longitude)
            }

            if(game.getRessource("target")) {
                game.getRessource("target").position = position

                res.send("Target has been updated")
            } else {
                game.addRessource(
                    new geoResources(
                        'target', 
                        'sane', 
                        position,
                        -1,
                        "",
                        true,
                        "target",
                        []
                    )
                )

                res.send("Target has been created")
            }
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/winner', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            if(game.getRessource(req.query.player)) {
                game.win(req.query.player)
                res.send(req.query.player, " win the game")
            } else {
                res.send("The player doesn't exist")
            }
        } else {
            res.send("You're not connected");
        } 
    })
})

router.get('/status', function (req, res) {
    res.send(game)
})

module.exports = router