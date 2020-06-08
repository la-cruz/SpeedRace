import AjaxRequest from './AjaxRequest'

function start(name) {
    return AjaxRequest.putData('https://192.168.75.28/admin/start', {
        name: name
    })
}

function stop() {
    return AjaxRequest.putData('https://192.168.75.28/admin/stop')
        .then((response) => {
            return response.json()
        })
}

function createTarget(lat, lon, auto) {
    return AjaxRequest.putData('https://192.168.75.28/admin/target', {
        latitude: lat,
        longitude: lon,
        auto: auto
    })
}

function status() {
    return AjaxRequest.getData('https://192.168.75.28/admin/status')
        .then((response) => {
            return response.json()
        })
}

function win(player) {
    return AjaxRequest.putData('https://192.168.75.28/admin/winner', {
        player: player
    })
}

export default { start, stop, createTarget, status, win }