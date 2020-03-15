class ListResources {
    constructor(list={}) {
        this.list = list;
    }
    
    push(resources) {
        this.list[resources.id]=resources;
    }

    get(id) {
        return this.list[id];
    }
}

module.exports = new ListResources();