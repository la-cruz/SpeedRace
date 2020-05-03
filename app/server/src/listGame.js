class ListGame {
    constructor(list=[]) {
        this.list = list;
    }
    
    push(game) {
        this.list.push(game);
    }

    get(id) {
        return this.list[id];
    }
}

module.exports = new ListGame();