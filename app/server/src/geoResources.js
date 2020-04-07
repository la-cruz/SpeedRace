class GeoResources {
    constructor (
        id,
        role="sane",
        position=[],
        ttl=-1,
        url="",
        blurred=true,
        status="alive",
        trophies=[]
    ) {
        this.id = id;
        this.role = role;
        this.position = position;
        this.ttl = ttl;
        this.url = url;
        this.blurred = blurred;
        this.status = status;
        this.trophies = trophies;
    }

    addTrophy(trophy) {
        this.trophies.push(trophy)
    }
}

module.exports = GeoResources;