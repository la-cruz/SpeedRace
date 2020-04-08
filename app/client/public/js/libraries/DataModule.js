import AjaxRequest from './AjaxRequest'

function trophies(login) {
    return AjaxRequest.getData('http://192.168.75.18:3376/api/resources/' + login + '/trophies')
        .then((response) => {
            return response.json()
        })
}

function stats(login) {
    return AjaxRequest.getData('http://192.168.75.18:3376/api/resources/' + login)
        .then((response) => {
            return response.json()
        })
}

function list() {
    return AjaxRequest.getData('http://192.168.75.18:3376/api/resources')
        .then((response) => {
            return response.json()
        })
}

function changePosition(login, lat, lon) {
    return AjaxRequest.putData('http://192.168.75.18:3376/api/resources/' + login + '/position', {
        position: [lat, lon]
    })
}

function changeImage(login, url) {
    return AjaxRequest.putData('http://192.168.75.18:3376/api/resources/' + login + '/image', {
        url: url
    })
}

export default { trophies, stats, list, changePosition, changeImage }