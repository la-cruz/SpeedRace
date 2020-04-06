const List = require('./listResources')

class Game {
    constructor (
        name="",
        started=false
    ) {
        this.name = name
        this.started = started
        this.startDate = null
        this.geoRessources = List
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

    isStarted() {
        return this.started
    }

    start() {
        this.started = true
        this.startDate = new Date()
    }

    stop() {
        this.started = false
        this.startDate = null
    }
}

module.exports = new Game()