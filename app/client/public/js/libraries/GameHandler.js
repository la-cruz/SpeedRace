import AjaxRequest from './AjaxRequest'

function start(name) {
    return AjaxRequest.putData('http://192.168.75.28:3376/admin/start', {
        name: name
    })
}

function stop() {
    return AjaxRequest.putData('http://192.168.75.28:3376/admin/stop')
        .then((response) => {
            return response.json()
        })
}

function createTarget(lat, lon, auto) {
    return AjaxRequest.putData('http://192.168.75.28:3376/admin/target', {
        latitude: lat,
        longitude: lon,
        auto: auto
    })
}

function status() {
    return AjaxRequest.getData('http://192.168.75.28:3376/admin/status')
        .then((response) => {
            return response.json()
        })
}

function win(player) {
    return AjaxRequest.putData('http://192.168.75.28:3376/admin/win', {
        player: player
    })
}

export default { start, stop, createTarget, status, win }