const List = require('./listResources')

class Game {
    constructor (
        name="",
        started=false,
        baseTtl=60
    ) {
        this.name = name
        this.started = started
        this.startDate = null
        this.geoRessources = List
        this.winner = ""
        this.baseTtl = baseTtl
    }

    addRessource(id) {
        this.geoRessources.push(id)
    }

    getRessource(id) {
        return this.geoRessources.get(id)
    }

    getRessources() {
        return this.geoRessources
    }

    getTtl() {
        return this.ttl
    }

    setTtl(newTtl) {
        this.baseTtl = newTtl
    }

    isStarted() {
        return this.started
    }

    win(player) {
        this.winner = player
    }

    start() {
        this.started = true
        this.startDate = new Date()
    }

    stop() {
        this.started = false
        this.startDate = null
        this.geoRessources.empty()
        this.name = ""
        this.winner = ""
    }
}

module.exports = new Game()