class Trophy {
    constructor (
        id,
        point=10,
        icon=null,
        unlockAt=null
    ) {
        this.id = id
        this.point = point
        this.icon = icon
        this.unlockAt = unlockAt
    }

    unlocked() {
        this.unlockAt = new Date()
    }

    copy(trophy) {
        this.id = trophy.id
        this.point = trophy.point
        this.icon = trophy.icon
        this.unlockAt = null
    }
}

module.exports = Trophy