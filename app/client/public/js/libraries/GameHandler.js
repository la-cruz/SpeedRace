import AjaxRequest from './AjaxRequest'

function start(name) {
    return AjaxRequest.putData('http://localhost:3000/admin/start', {
        name: name
    })
}

function stop() {
    return AjaxRequest.putData('http://localhost:3000/admin/stop')
        .then((response) => {
            return response.json()
        })
}

function status() {
    return AjaxRequest.getData('http://localhost:3000/admin/status')
        .then((response) => {
            return response.json()
        })
}

export default { start, stop, status }