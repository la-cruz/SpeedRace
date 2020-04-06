class ListTrophies {
    constructor(list=[]) {
        this.list = list
    }

    push(trophy) {
        this.list.push(trophy)
    }

    getTrophies() {
        return this.list
    }

    getTrophy(index) {
        return this.list[index]
    }

    getTrophyById(id) {
        var trophy = 'no trophy'

        this.list.map((elem) => {
            if(elem.id === id) {
                trophy = elem
            }
        })

        return trophy
    }

    getTotalPoint() {
        var count = 0

        this.list.map((elem) => {
            count += elem.point
        })

        return count
    }
}

module.exports = ListTrophies