const geoResources = require("../src/geoResources")
const Trophy = require("../src/trophy")
const baseListTrophies = require("../src/baseListTrophies")
const express = require('express')
const axios = require('axios')
const router = express.Router()
const game = require("../src/game")

function authenticate(jwt) {
    var bool = false;

    return axios.get('https://192.168.75.28:8080/authenticate', {
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

router.get('/resources', function (req, res) {
authenticate(req.headers.authorization)
    .then(function(bool) {
        bool ? res.send(game.getRessources()) : res.send("You're not connected");
    })
})

router.get('/resources/trophies', function (req, res) {
    res.send(baseListTrophies)
})

router.get('/resources/:id/trophies', function (req, res) {    
authenticate(req.headers.authorization)
    .then(function(bool) {
        bool ? res.send(game.getRessource(req.params.id).trophies) : res.send("You're not connected");
    })
})

router.put('/resources/:id', function (req, res) {
authenticate(req.headers.authorization)
    .then(function(bool) {
        if(bool) {
            if(game.isStarted()) {
                if(!game.getRessource(req.params.id)) {
                    game.addRessource(new geoResources(req.params.id))
                }
                res.send(game.getRessource(req.params.id))
            } else {
                res.send("The game isn't started")
            }
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/resources/:id/image', function (req, res) {
authenticate(req.headers.authorization)
    .then(function(bool) {
        if(bool) {
            if(game.isStarted()) {
                if(game.getRessource(req.params.id)) {
                    game.getRessource(req.params.id).url = req.query.url;
                    res.send('Image changed for the user : ' + req.params.id)
                } else {
                    res.send("User not found")
                }
            } else {
                res.send("The game isn't started")
            }
        } else {
            res.send("You're not connected");
        } 
    })
})

router.put('/resources/:id/position', function (req, res) {
authenticate(req.headers.authorization)
    .then(function(bool) {
        if(bool) {
            if(game.isStarted()) {
                if(game.getRessource(req.params.id)) {
                    game.getRessource(req.params.id).position = req.query.position;
                    res.send('Position changed for the user : ' + req.params.id)
                } else {
                    res.send('User not found')
                }
            } else {
                res.send("The game isn't started")
            }
        } else {
            res.send("You're not connected")
        } 
    })
})

router.put('/resources/:id/trophies', function (req, res) {
authenticate(req.headers.authorization)
    .then(function(bool) {
        if(bool) {
            var trophy = baseListTrophies.getTrophyById(req.query.trophy)
            if(trophy) {
                if(game.getRessource(req.params.id)) {
                    var newTrophy = new Trophy()
                    newTrophy.copy(trophy)
                    newTrophy.unlocked()
                    game.getRessource(req.params.id).addTrophy(newTrophy)
                } else {
                    res.send("the player doesn't exist")
                }
            } else {
                res.send("the trophy doesn't exist")
            }
            res.send("Got a PUT request at /api")
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/resources/:id/update', function (req, res) {
    authenticate(req.headers.authorization)
    .then(function(bool) {
        if(bool) {
            if(game.isStarted()) {
                if(game.getRessource(req.params.id)) {
                    game.getRessource(req.params.id).ttl = req.query.ttl
                    game.getRessource(req.params.id).role = req.query.role
                    game.getRessource(req.params.id).status = req.query.status
                    game.getRessource(req.params.id).trophies = req.query.trophies
                    res.send('Stats updated for the user : ' + req.params.id)
                } else {
                    res.send('User not found')
                }
            } else {
                res.send("The game isn't started")
            }
        } else {
            res.send("You're not connected")
        } 
    })
})

module.exports = router;
