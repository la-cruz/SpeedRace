import AjaxRequest from './AjaxRequest'

function login(login, password) {
    return AjaxRequest.postData('https://192.168.75.28:8080/login', {
        login: login,
        password: password
    }).then((json) => {
        if(json.status == 204) {
            sessionStorage.setItem('token', json.headers.get("Authentification"));
            localStorage.setItem('login', login);
            return true
        } else {
            var message = ""
            switch (json.status) {
                case 404:
                    message = "Login incorrect";
                    break;
                case 401:
                    message = "Password incorrect";
                    break;
                default:
                    break;
            }
            return message
        }
    })
}

function logout() {
    return AjaxRequest.deleteData('https://192.168.75.28:8080/logout?token=' + sessionStorage.getItem('token')).then((json) => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('login');
        return false
    })
}

export default { login, logout }